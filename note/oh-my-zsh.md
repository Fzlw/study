#oh-my-zsh 的安装配置及主题配置
1. 先安装Homebrew
	* ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
	* brew -v 检查是否安装成功
		* Homebrew 1.7.1
		* Homebrew/homebrew-core (git revision ddac; last commit 2018-08-09)

1. 安装wget
	* brew install wget
	* wget www.baidu.com 测试是否安装成功

1. 安装oh-my-zsh
	* wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | sh

1. 主题选择
	* 执行open ～/.zshrc
	* 找到ZSH_THEME="robbyrussell"，robbyrussell ，是默认的主题，修改 ZSH_THEME="样式名称"
	* 主题预览本机，输入~/.oh-my-zsh/themes，ls即可查看
	* [主题预览](https://github.com/robbyrussell/oh-my-zsh/wiki/themes)

1. 卸载方法。  uninstall_oh_my_zsh



## 参考命令
	* su root 进入管理员命令行
	* echo $SHELL 查看当前shell类型
	* chsh -s /bin/zsh更改bash为zsh