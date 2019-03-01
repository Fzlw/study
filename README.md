# study
不断学习，坚持学习


1. 2018-10-17
    * 遇到一个问题，.gitignore 中有忽略文件，但是git add . 时依然被添加进去，目录路径没问题的
    * 原因： 这个文件使在我提交了好多次后才发现老是有些logs或run被 git add . 进去
    * 后来发现了，想忽略掉，发现  .gitignore 没有起作用，百度发现是 **文件已存在跟踪列表**
    * [传送门](https://blog.csdn.net/u012012240/article/details/70172886)
    * 解决方法： 
        1. 执行  git rm --cached "文件路径"
        1. 如果出现 **not removing 'game/logs' recursively without -r**
        1. 说明需要递归删除跟踪列表里的文件（实际文件不会被删除）
        1. 加上 -r 即可   git rm -r --cached "文件路径"
        1. 最后记得在  .gitignore  确认添加忽略文件路径，这样以后一些烦人的logs,run不需要的文件就可以过滤掉了
