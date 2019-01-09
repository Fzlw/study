import argparse
from PIL import Image

# 使用命令行解析包完成简单图片转字符画
# https://blog.csdn.net/tumi678/article/details/80507609

parser = argparse.ArgumentParser(add_help=False)
parser.add_argument('file')  # 图片参数
parser.add_argument('-o', help='output path')
parser.add_argument('-w', type=int, default=80)
parser.add_argument('-h', type=int, default=80)

# 获取参数 返回值 
args = parser.parse_args()
IMG = args.file
outPath = args.o
width = args.w
height = args.h
ascii_char = list("$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!\
                    lI;:,\"^`'. ")


def convert(r, g, b, alpha=256):
    if alpha == 0:
        return ' '
    length = len(ascii_char)
    gary = int(0.2126 * r + 0.7125 * g + 0.0722 * b)
    # return ascii_char[gary % length]
    unit = (256.0 + 1) / length
    return ascii_char[int(gary / unit)]


im = Image.open(IMG)
im = im.resize((width, height))
# im.show()
pix = im.load()
txt = ''

for y in range(im.size[1]):
    for x in range(im.size[0]):
        txt += convert(*pix[x, y])
    txt += '\n'

with open('/Users/fullstack/github/study/python/my/ascii_dora.txt', 'w') as f:
    f.write(txt)

