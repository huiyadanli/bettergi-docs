---
title: 在Linux上运行
order: 6
---

> 超级简单的linux运行教程喵₍^. .^₎⟆

## 选择一个可用的原神客户端
- ~~网页版云原神：BetterGi并不支持网页版云原神~~
- ~~客户端云原神: Linux上暂时没有方法可以运行客户端云原神~~
- 客户端原神: 你可以使用steam或[an-anime-game-launcher](https://github.com/an-anime-team/an-anime-game-launcher)作为你的原神客户端

## 第一步：下载BetterGi
- ~~因为wine并不支持webview2,所以你无法通过BetterGi的安装包安装~~
- 去下载页面下载以7z为后缀的便携版
[下载BetterGi](/download.html)

## 第二步：proton其中wine所在的目录

- 你可以尝试在你的用户目录中找到你客户端的proton目录
如果你使用的是[an-anime-game-launcher](https://github.com/an-anime-team/an-anime-game-launcher)这个路径可能位于`~/.local/share/anime-game-launcher/runners`中
不同的安装方式(如通过flatpak)或者不同客户的都有可能导致位置不同，但是路径是大差不差的

打开存放proton所在的路径，你可以看到类似`spritz-wine-xxx-xxx`或者`GE-Proton-xxx`等等类似的文件夹孤零零的在存放proton文件夹



- proton说到底是封装了一个wine,这个wine程序在proton对应的版本号文件夹中可以找到
 
例如我现在所在`~/.local/share/anime-game-launcher/runners/`文件夹中,这个是我proton存放的文件夹
我可以看到一个文件夹`spritz-wine-cachyos-wow64-10`,让我们打开它，就可以看到类似以下的文件目录
```
spritz-wine-cachyos-wow64-10.0-10/
├── bin/
│   └── wine  <==我们只用关注这个可执行文件就可以了
├── lib/
├── lib32/
├── lib64/
└── share/
```
其中bin目录下的wine就是我们要找的可执行文件，让我们把它的路径记录下来

## 第三步：找到WINEPREFIX的路径

- 你可以尝试在proton目录附近或同级子目录中找到它
如果你使用的是[an-anime-game-launcher](https://github.com/an-anime-team/an-anime-game-launcher)这个路径可能位于`~/.local/share/anime-game-launcher/prefix`


例如我现在所在`~/.local/share/anime-game-launcher/prefix`文件夹中，这个是我wineprefix所在的路径
它的文件结构类似如下
```
prefix/
├── dosdevices/
├── drive_c/
├── system.reg
├── userdef.reg
└── user.reg
```
我们把wineprefix路径记录下来

## 第四步：配置BetterGI运行环境

你需要了解BetterGi运行所需要的[系统环境](/quickstart.html#系统环境)

### 安装中文字体
你可以通过我提供的连接下载到的中文字体，也可以使用自己的中文字体(字体需包含emoji否则也会出现问题)
- [中文字体下载](https://flc.zjnu.edu.cn/_upload/article/files/99/14/cd6ef3944cd9bf188adb7e774107/796f80c8-28f7-4edb-92ae-d89c6f586a31.zip)

把字体解压后放在`[你的prefix目录]/prefix/drive_c/windows/fonts`文件夹中

- 如果不安装中文字体，在安装.NET时只能看到黑色框框，并且无法正常使用BetterGi

### 安装.NET 8 运行时
通过以下连接下载.NET 8的安装包
- [.NET 8 运行时](https://dotnet.microsoft.com/zh-cn/download/dotnet/thank-you/runtime-desktop-8.0.16-windows-x64-installer)

运行以下命令以安装.NET 8 进行时
```
export WINEPREFIX=[你的prefix目录路径]
set WINE [你的wine可执行文件路径]
"$WINE" [.NET 8 运行时的路径]
```

### 尝试运行BetterGi
恭喜你，现在你可以尝试bettergi是否能正常启动了
```
export DOTNET_SYSTEM_GLOBALIZATION_USENLS=1
export WINEPREFIX=[你的prefix目录路径]
set WINE [你的wine可执行文件路径]
"$WINE" [BetterGi路径]
```

- 如果使用的是niri之类的窗口管理器可能会遇到一些显示问题,但并不影响使用

## 第五步：检验成果

先启动原神，等待一会后再通过命令启动BetterGi(若数序出错可能导致错误)

点击开始

最后高贵的Linux用户就能畅玩BetterGi啦！喵喵₍^. .^₎⟆

