import curses
from random import randrange, choice

# 定义用户行为
actions = ['Up', 'Down', 'Left', 'Right', 'ReStart', 'Exit']
# 不区分大小写
letter_codes = [ord(ch[:1]) for ch in actions]
letter_codes += [ord(ch[:1].lower()) for ch in actions]
# 关联
actions_dict = dict(zip(letter_codes, actions * 2))


class Grid:
    def __init__(self, rows, cols):
        self.rows = rows
        self.cols = cols
        self.reset()

    def reset(self):
        self.grid = [[0 for i in range(self.rows)] for j in range(self.cols)]

    def add_element(self, count=2):
        if count <= 0:
            return
        new_ele = 4 if randrange(100) >= 80 else 2
        empty_grid = [(i, j) for i in range(self.rows) for j in range(self.cols) if self.grid[i][j] == 0]
        (i, j) = choice(empty_grid)
        self.grid[i][j] = new_ele
        count -= 1
        return self.add_element(count)


if __name__ == '__main__':
    # curses.wrapper(draw)
    grid = Grid(4, 4)
    grid.add_element()
    print(grid.grid)