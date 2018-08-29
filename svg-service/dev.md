1. 确定svg图片的访问方式
  * src 路径直接应用文件名
  * css中background: url()路径访问文件名路径
  * js动态加载，也是用路径名

1. 想法： 构建一个只要将svg文件放入制定文件夹中会被自动编译压缩，提供给外部一个文件名，可以直接通过require去访问
  * 涉及到node模块的svg
  * require的熟练配置文件
  * gulp的自动化编译压缩

1. 查资料
	* 并没有找到svg的node模块
	* 大致思路的先用使用require配置一个加载文件路径，在使用gulp做自动化处理
	* [require.config进阶配置](https://segmentfault.com/a/1190000002401665)

1. 失败原因
	* require只能用来加载js文件,尝试将svg路径存放在js对象中
	* 感觉需要对文件进行操作，node才能做到