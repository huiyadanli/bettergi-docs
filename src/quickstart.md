---
title: 快速上手
icon: rocket
order: 4
---

::: tip 提示

QQ交流群1（满） [694769138](http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=hneYjH2EgI1-pQI1em3uaVG7l-7vz8ye&authKey=q9lhYjjNQ6Tiw7uBvL1%2BWZZewa0%2B1H6PNFv1ETsQQBWlLpXqUx1bGeD7iK4iLfpv&noverify=0&group_code=694769138) 
QQ交流群2 [906536632](http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=_nmC8Neh7mZaGb2hIsO3p4-DKdxBlReQ&authKey=X7rGdx4jbA%2Bs2Juotlov0cg57%2Bv8CwRdjMgYYsxPtdtkl5NKniJhbDILKhWCYS4B&noverify=0&group_code=906536632)

本软件[**开源**](https://github.com/babalae/better-genshin-impact)且**免费**，任何人都可以直接下载并使用，BetterGI 不会在任何平台对软件本体进行交易售卖、收取费用等活动（比如：咸鱼、淘宝）。

**如果你是花钱购买的本软件，请及时退款并举报商家。**

:::
---

本文将会带你快速了解 BetterGI 的基本使用方法。

如果你对本软件的安全性有疑问，请先阅读[常见问题](/faq.html#❓会不会封号)。

## 系统环境

BetterGI 只支持 Windows 系统，不支持手机，首先要确认你的系统环境是否满足 BetterGI 的运行要求。

推荐的电脑配置至少能够中画质60帧流畅游玩原神，否则部分功能的使用体验会较差。

软件运行的必备条件：
* Windows 10 或更高版本的64位系统
* [.NET 7 运行时](https://dotnet.microsoft.com/zh-cn/download/dotnet/7.0) （没有的话，启动程序，系统会提示下载安装）

## 下载

当前有两个下载渠道，根据自己的网络自行选择：

* [📥Github 下载](https://github.com/babalae/better-genshin-impact/releases)
* [📥蓝奏云下载](https://wwmy.lanzouq.com/b00rs2msd)  密码:coco


BetterGI 提供了两个版本，分别是**安装版**和**便携版**，两个版本除了打包与安装方式之外，无任何区别。

![](https://img.alicdn.com/imgextra/i4/2042484851/O1CN01cLBZ1Y1lhoEZP2Uq8_!!2042484851.png)

* **安装版**的文件名是 `BetterGI_Setup_v版本号.exe`，安装后会在开始菜单创建快捷方式。如果你不知道解压缩是什么操作，请使用这个版本。
* **便携版**的文件名是 `BetterGI_v版本号.7z` （老版本是`zip`压缩包），解压并运行 `BetterGI.exe` 即可。如果你有一定的计算机基础，推荐使用这个版本。

## 启动

安装版在安装后直接双击桌面快捷方式启动。便携版本解压后，双击软件目录下的 `BetterGI.exe` 启动。

启动后，会弹出 UAC 提示（用于提升至[管理员权限](/faq.html#❓为什么需要管理员权限)），请选择“是”。**如果没有弹 UAC 提示，请手动右键——以管理员身份运行！**

![请选择是，不然无法正常使用](https://img.alicdn.com/imgextra/i2/2042484851/O1CN01wvpHsP1lhoEfG4Xb6_!!2042484851.png)

### 常见问题

* [❓双击软件后没有反应？](/faq.html#❓启动软件提示安装-net-7-运行时)
* [❓弹出英文提示 ”You must install or update .NET to run this application. “，怎么办？](/faq.html#❓启动软件提示安装-net-7-运行时)
* [❓提示“PaddleOcr预热失败”应该如何解决？](/faq.html#❓提示-paddleocr预热失败-应该如何解决)

### 更好的原神，启动！

BetterGI 仅依赖于图像输入，所以支持原神各个区服、云原神等。

首先第一步，启动你的原神客户端，然后确认并修改以下设置：

* 游戏得是中文，不支持其他语言（The game language only supports Chinese）
* 游戏窗口大小是 `1920x1080`，全屏或者窗口化都行（这个是推荐分辨率，支持所有功能，实际大部分功能 16:9 分辨率都支持）,具体支持情况请查阅[文档](/doc.html)
* 游戏亮度请保持默认
* 不能有任何游戏画面滤镜（HDR、N卡滤镜等）

![设置1080P与默认亮度](https://img.alicdn.com/imgextra/i3/2042484851/O1CN013Dbv971lhoEc70FrM_!!2042484851.jpg)

然后第二步，打开 BetterGI 显示主界面后，点击“启动”按钮。

**如果你使用的是云原神，或者你的电脑中存在多个原神，或者你需要通过其他启动器启动原神，请关闭”同时启动原神“的功能。**

![点击启动按钮](https://img.alicdn.com/imgextra/i4/2042484851/O1CN01QlDwQP1lhoEclOeIJ_!!2042484851.png)

启动后，会自动激活原神窗口，等待窗口左下角刷出日志后，BetterGI 完成启动。

![](https://img.alicdn.com/imgextra/i2/2042484851/O1CN01VOz5j71lhoEg4qwil_!!2042484851.png)

## 测试功能是否正常

启动完成后，无论你要使用哪个[功能](/feat.html)，先通过”[自动拾取](/doc.html#自动拾取)“功能测试一下配置是否无误。**测试完成后再去使用其他功能！**

首先在”实时任务“选项卡中确认”自动拾取“功能是处于开启状态下，默认是开启的。

然后随便找个采集物、掉落物，站在边上，看看”自动拾取“功能是否正常工作。

如果没有自动拾取，请按照下列步骤检查：

1. 左下角的日志中，是否有”交互或拾取“的日志输出？
    1. 如果没有，请在”启动“选项卡页，切换”[截图模式](/doc.html#截图方式)“
    2. 如果有，且持续输出日志，说明模拟操作的权限不够，请以管理员权限启动 BetterGI，如果还不行，请关闭杀毒软件获添加白名单。
2. [日志提示 "Some simulated input commands were not sent successfully..."，说明模拟操作被拦截，请关闭杀毒软件获添加白名单。](/faq.html#❓报错提示-some-simulated-input-commands-were-not-sent-successfully)

**如果自动拾取功能正常，说明 BetterGI 已经可以正常工作了，享受 BetterGI 带来的便利吧！**

其他各个功能如何使用可以查看[文档](/doc.html)。

在使用过程中，如果遇到任何问题，可以先查看[常见问题](/faq.html)。
