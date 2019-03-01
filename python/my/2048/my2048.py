import curses
from random import randrange, choice


class Grid:
    def __init__(self, rows, cols):
        self.rows = rows
        self.cols = cols
        self.score = 0
        self.reset()

    def reset(self):
        self.grid = [[0 for i in range(self.rows)] for j in range(self.cols)]
        self.add_element(5)

    def add_element(self, count=1):
        if count <= 0:
            return
        new_ele = 4 if randrange(100) >= 80 else 2
        empty_grid = [(i, j) for i in range(self.rows)
                      for j in range(self.cols) if self.grid[i][j] == 0]
        (i, j) = choice(empty_grid)
        self.grid[i][j] = new_ele
        count -= 1
        return self.add_element(count)

    # 将非0数字聚集在一起, 默认step > 0 向右聚集
    def gather(self, row, step=1):
        new_row = [i for i in row if i != 0]
        repair = (len(row) - len(new_row)) * [0]
        return repair + new_row if step > 0 else new_row + repair

    # 合并相同的值
    def merge(self, row):
        last = len(row) - 1
        for i in range(len(row)):
            if row[i] == 0:
                continue
            elif i >= last:
                break
            elif row[i] == row[i + 1]:
                row[i + 1] *= 2
                row[i] = 0
                # 更新分数
                self.score += row[i + 1]
        return self.gather(row)

    # 实现矩阵的列映射成行，行映射为列
    def trans(self):
        new_grid = []
        for i in range(len(self.grid)):
            new_grid.append([])
            for j in range(len(self.grid[i])):
                new_grid[i].append(self.grid[j][i])
        self.grid = new_grid

    # 反转整个矩阵
    def invert(self):
        new_grid = []
        for grid in self.grid:
            grid = self.gather(grid, -1)
            new_grid.append(grid)
        self.grid = new_grid

    def right(self):
        new_grid = []
        for grid in self.grid:
            grid = self.gather(grid)
            grid = self.merge(grid)
            new_grid.append(grid)
        self.grid = new_grid

    def left(self):
        self.right()
        self.invert()

    def up(self):
        self.trans()
        self.left()
        self.trans()

    def down(self):
        self.trans()
        self.right()
        self.trans()


class Screen:
    help_string1 = '(W)up (S)down (A)left (D)right'
    help_string2 = '     (R)Restart (Q)Exit'
    over_string = '           GAME OVER'
    win_string = '          YOU WIN!'

    def __init__(self, stdscr, size, grid):
        self.stdscr = stdscr
        self.size = size
        self.draw(grid)

    def draw(self, grid, score=0):
        self.stdscr.clear()
        string = f'SCORE:{score}\n'
        row = '+-----'
        col = '|'
        for r in range(len(grid)):
            string += row * self.size + '+\n'
            for c in range(len(grid[r])):
                value = ' ' if grid[r][c] == 0 else str(grid[r][c])
                string += col + ' ' * 2 + value + ' ' * 2
            string += col + '\n'
        string += row * self.size + '+\n' + Screen.help_string1 + '\n' + \
            Screen.help_string2 + '\n'
        self.stdscr.addstr(string)


class Game:
    UP = 'up'
    LEFT = 'left'
    DOWN = 'down'
    RIGHT = 'right'
    RESTART = 'restart'
    EXIT = 'exit'
    actions = [UP, LEFT, DOWN, RIGHT, RESTART, EXIT]
    letter_codes = [ord(ch) for ch in 'WASDRQwasdrq']
    actions_dict = dict(zip(letter_codes, actions * 2))

    def __init__(self, size, win_num=2048):
        self.size = size
        self.win_num = win_num
        self.end = False
        self.score = 0
        self.reset()

    def reset(self):
        self.resetGrid()

    def resetGrid(self):
        self.grid = Grid(self.size, self.size)

    def get_user_action(self, char):
        if (char == Game.EXIT):
            return False
        elif char == Game.RESTART:
            self.grid.reset()
        
        getattr(self.grid, char)()
        self.grid.add_element()
        self.screen.draw(self.grid.grid)
        print(self.grid.score)
            
    def __call__(self, stdscr):
        self.stdscr = stdscr
        self.screen = Screen(stdscr, self.size, self.grid.grid)
        while True:
            char = self.stdscr.getch()
            if char in Game.actions_dict:   
                self.get_user_action(Game.actions_dict[char])


if __name__ == '__main__':
    curses.wrapper(Game(4))
