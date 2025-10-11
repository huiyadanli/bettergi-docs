---
title: 快速上手
icon: rocket
order: 4
---

::: tip 提示

[交流群](/community.html) 

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
* [.NET 8 运行时](https://dotnet.microsoft.com/zh-cn/download/dotnet/thank-you/runtime-desktop-8.0.16-windows-x64-installer) （没有的话，启动程序，系统会提示下载安装）

## 下载

当前有两个下载渠道，根据自己的网络自行选择：

* [📥Github 下载](https://github.com/babalae/better-genshin-impact/releases)
* [其他下载渠道见下载页](/download.html)


BetterGI 在 Github 页面提供了多个版本，主要是**安装版**和**便携版**，不同版本除了打包与安装方式之外，无任何区别。

![快速上手1-版本说明](https://github.com/user-attachments/assets/63f72caa-220d-4fc0-94a3-b4c511cf0e6c)

* **安装版（新离线版）** 的文件名是 `BetterGI.Install.版本号.exe`，安装速度比下面的安装版更快，且会自动更新到新版本。
* **安装版** 的文件名是 `BetterGI_Setup_v版本号.exe`，安装后会自动在开始菜单创建快捷方式。如果你不知道解压缩是什么操作，请使用这个版本。
* **便携版** 的文件名是 `BetterGI_v版本号.7z` （老版本是`zip`压缩包），解压并运行 `BetterGI.exe` 即可。

有更高版本号的情况下优先下载更高版本号的 BetterGI！

<details>
<summary>Github 下载太慢怎么办？</summary>

可以使用下面的公益加速服务：

[https://moeyy.cn/gh-proxy/](https://moeyy.cn/gh-proxy/)

[https://github.abskoop.workers.dev/](https://github.abskoop.workers.dev/)

[https://gitmirror.com/files.html](https://gitmirror.com/files.html)

</details>

## 启动

安装版在安装后直接双击桌面快捷方式启动。便携版本解压后，双击软件目录下的 `BetterGI.exe` 启动。

启动后，会弹出 UAC 提示（用于提升至[管理员权限](/faq.html#❓为什么需要管理员权限)），请选择“是”。**如果没有弹 UAC 提示，请手动右键，并选择“以管理员身份运行”！**

![请选择是，不然无法正常使用](https://img.alicdn.com/imgextra/i2/2042484851/O1CN01wvpHsP1lhoEfG4Xb6_!!2042484851.png)

### 常见问题

* [❓双击软件后没有反应？](/faq.html#❓启动软件提示安装-net-运行时)
* [❓弹出英文提示 "You must install or update .NET to run this application."，怎么办？](/faq.html#❓启动软件提示安装-net-运行时)
* [❓提示“PaddleOcr预热失败”应该如何解决？](/faq.html#❓提示-paddleocr预热失败-应该如何解决)

### 更好的原神，启动！

BetterGI 仅依赖于图像输入，所以支持原神各个区服、云原神等。

第一步，启动你的原神客户端，然后确认并修改以下设置：

* 游戏语言必须为简体中文，暂不支持其他语言（The game language only supports Simplified Chinese.）
* 游戏窗口大小是 `1920x1080`，全屏或者窗口化都行（这个是推荐分辨率，支持所有功能，实际大部分功能 16:9 分辨率都支持），具体支持情况请查阅[文档](/doc.html)
* 游戏亮度请保持默认
* 不能有任何游戏画面滤镜（HDR、N卡滤镜等）
* 在游戏 DirectX 层无其他遮盖元素，比如： 显示 FPS 的 MSI Afterburner 可能会遮盖一些识别要素，导致功能无法使用

![设置1080P与默认亮度](https://img.alicdn.com/imgextra/i3/2042484851/O1CN013Dbv971lhoEc70FrM_!!2042484851.jpg)

第二步，打开 BetterGI 显示主界面后，点击“启动”按钮。

**如果你使用的是云原神，或者你的电脑中存在多个原神，或者你需要通过其他启动器启动原神，请关闭“同时启动原神”的功能。**

![bgi界面](https://github.com/user-attachments/assets/dc0dd579-4f2d-4238-986f-54f63691eaf7)


启动后，会自动激活原神窗口，等待窗口左下角刷出日志后，BetterGI 完成启动。

![](https://img.alicdn.com/imgextra/i2/2042484851/O1CN01VOz5j71lhoEg4qwil_!!2042484851.png)

## 测试功能是否正常

启动完成后，无论你要使用哪个[功能](/doc.html#功能指引)，先通过“[自动拾取](/feats/timer/pick.html)”功能测试一下配置是否无误。**测试完成后再去使用其他功能！**

首先在“实时任务”选项卡中确认“自动拾取”功能是处于开启状态下，默认是开启的。

然后随便找个采集物、掉落物，站在边上，看看“自动拾取”功能是否正常工作。

如果没有自动拾取，请按照下列步骤检查：

1. 左下角的日志中，是否有“交互或拾取”的日志输出？
    1. 如果没有，请在“启动”选项卡页，切换“[截图模式](/quickstart.html#截图方式)”。（【推荐】或者解决BitBlt截图方式不生效的问题：[解决方案](https://github.com/babalae/better-genshin-impact/issues/92)）
        1. 所有截图方式都切换了依旧不行？请再次确认是否对游戏添加了滤镜（ReShade、N卡滤镜等）。当前不存在所有截图方式都无法使用的情况，出现这种情况一定是你的操作有问题！
    2. 如果有，且持续输出日志，说明模拟操作的未执行成功，请先确认是否以管理员权限启动 BetterGI ；若仍有问题，请再关闭杀毒软件或把 BetterGI 添加至杀毒软件白名单。
2. [日志提示 "模拟键鼠消息发送失败！"，说明模拟操作被拦截，请关闭杀毒软件获添加白名单。](/faq.html#❓报错提示-some-simulated-input-commands-were-not-sent-successfully)

**如果自动拾取功能正常，说明 BetterGI 已经可以正常工作了，享受 BetterGI 带来的便利吧！**

如何使用其他各个功能可以查看[文档](/doc.html)。

在使用过程中，如果遇到任何问题，可以先查看[常见问题](/faq.html)。

## 几种截图方式的区别

* BitBlt
    * 使用 GDI 获取窗口内容。
    * 兼容性最好，问题最少的方式，但是性能最差。
    * 出现任何奇怪的问题的情况下请优先尝试使用此方式。
    * **部分Windows 11由于显卡设置原因可能无法使用此方式，请查看[解决方案](https://github.com/babalae/better-genshin-impact/issues/92)，0.36 及以后版本BetterGI启动后会自动完成相关设置，此时请注意重启游戏**
* DwmGetDxSharedSurface
    * 使用 Windows 未公开 API 获取 DWM 合成时的窗口贴图。
    * 性能最好，理论上截图结果和 BitBlt 相同。
    * 使用未公开 API，不保证稳定性，可能会出现奇怪的问题。
* WindowsGraphicsCapture（**云原神只能使用这种方式**）
    * 使用 Windows 提供的截图 API 获取窗口截图。
    * 需要 Windows 10 1903 及以上的系统版本才能使用。
    * 获取 DWM 合成后的结果，可以捕获到硬件叠加层，支持云原神。
    * Windows 10 会在游戏窗口上加上黄色边框，Windows 11 没有。
* WindowsGraphicsCapture（HDR）
    * 与 WindowsGraphicsCapture 相同，增加了 HDR 支持。
    * 请仅在游戏开启了 HDR 时使用，否则会导致画面变暗。
    * 略微影响截图性能。

## 本地文件

在使用过程中，难免会遇到需要修改或打开本地文件的情况，本节将为你讲解BetterGI常用本地文件的位置与作用。

### 1. BetterGI  
这个文件夹是你的BetterGI安装目录即本地存储文件夹，具体位置根据你的安装位置决定。如果你不记得你装在哪儿了，可以右键你桌面的快捷打开方式图标，查看里面的索引位置。  
有的用户这里的目录是`BetterGI/BetterGI/xxx`，有的则是`BetterGI/xxx`，这并不会影响你的使用，不同的目录的产生原因是安装方式不同所致。  
**下文所提及的所有文件夹都位于该目录下。**

### 2. Assets
这个文件夹是BetterGI的本体所使用的资源文件夹，里面存放的主要为模型、地图、编辑器、仓库页面等资源文件。  
> 一般用户日常用不到修改这些文件，喜欢动手的技术玩家可以尝试自己修改。

### 3. log
当你在社区提问时，大家问你“看看log”，你就需要使用到这个文件夹下的文件了。
BetterGI运行过程中会产生很多的日志记录（不会占用太多空间，不用担心你的~~内存~~硬盘不够，超过21天的日志也会自动删除哦），
这些记录通常会以天为单位保存到这个文件夹下`.log`后缀的文件里（看不到后缀的请点击文件夹窗口上方的`视图`选项，勾选其中的`文件扩展名`）。  
你正常需要使用到的文件就是`log`目录下后缀为`.log`的文件，你可以根据文件名判断这是哪一天的日志。
用记事本等文本编辑器打开后，日志中会显示BetterGI的运行记录、报错、警告等信息。  
当其他人正在帮助你解决你的问题时，请积极配合，提供必要的日志信息。  
_在没有错误日志的情况下诊断任何问题无异于闭眼开车  —— Apache官方文档 Getting Started篇章_

### 4. Repos
这个文件夹下存储的是你脚本仓库的中央仓库信息，当你点击`更新仓库`后，BetterGI会下载你选择的路径中的所有在线仓库文件，并存储到这个文件夹下。  
当你在本地订阅了某个脚本/路径后，BetterGI会复制你订阅的脚本/路径，粘贴到下文会提及的[User](#5-user)文件夹下，因此，`Repos`文件夹内的文件并不是你实际运行时所使用的文件。  
你会在这里看到一个`bettergi-scripts-list-git`文件夹和一个`repo_updated.json`文件，前者是原封不动的在线仓库文件，后者则是根据你的本地记录生成的更新脚本/路径的汇总文件。

### 5. User
本章节将是文件夹讲解的**重点**（与[log](#3-log)一样重要），请**仔细阅读**。本文仅讲解对应文件夹的概述，详情部分会引导你至对应文档查看。    
正如其名，这个文件夹内存储的是你所有的用户信息，包括订阅的脚本、软件设置、脚本设置等。  
> 在更新BetterGI时，如果你担心你的设置等记录丢失，请提前备份此文件夹（使用安装器安装的BetterGI通常不会有此问题）  

#### 5.1 AutoFight
这里存储的是BetterGI内置的、你订阅的或你编写的`战斗策略`，关于`战斗策略`的部分请查看[战斗策略脚本编写](/feats/task/domain.html#战斗策略脚本编写)。  
这些文件会在你选择战斗策略时出现在你的下拉列表里。

#### 5.2 AutoGeniusInvokation
这里存储的是`七圣召唤策略`，关于`七圣召唤策略`的部分请查看[自动七圣召唤](/feats/task/tcg.html)。  

#### 5.3 AutoPathing
这里存储的是`地图追踪`的路径文件，也就是你在本地仓库订阅后，BetterGI将路径复制过来的位置，具体的`地图追踪`讲解请查看[地图追踪](/feats/autos/pathing.html)以及[地图追踪制作](/dev/pathing-dev.html)。

#### 5.4 JsScript
这里存储的是`Javascript脚本`，同`地图追踪`，也是你在本地仓库订阅后，BetterGI将脚本复制过来的地方。略有不同的是，部分脚本作者配置了需要保存的文件，你运行脚本后生成的一些运行记录会被作者保存下来，方便下次运行时根据记录做出一些判断，因此，请不要随意删除你脚本文件的文件夹，你会丢失一些宝贵的数据。  
由于Js脚本的自由度较高，bug产生的概率也较高，关于这部分，可以查看[Javascript 脚本](/feats/autos/jsscript.html)下的常见问题。  

#### 5.5 KeyMouseScript
有的用户可能会使用`录制回放`的功能，这里便存储了你录制的键鼠操作json文件，这部分知识点较少，但你仍然可以阅读[键鼠录制](/feats/autos/kmscript.html)学习使用。  

#### 5.6 OneDragon
这个文件夹内的解释非常简单，仅存储了`一条龙`的配置信息，也就是你的各个选项设置，以及你添加的`一条龙`任务名称。  

#### 5.7 ScriptGroup
这个文件夹下的文件是你经常会用到的，也就是调度器内每个任务的配置文件。当你给某个任务设置了队伍切换、生存位、行走位、自定义设置等选项后，都会保存到这里。  

#### 5.8 avatar_macro.json
这个文件是角色`一键宏`配置文件，你在`辅助操控`-`一键宏（按角色）`中配置的信息会存储在这里。具体信息请查看[一键宏文档](/feats/macro/onem.html)。  

#### 5.9 config.json
除了本文提及的局部设置外（脚本和路径设置具有独立性，因此是分开存储的），所有BetterGI的整体设置都储存在这个文件中。由于设置项过多，这里不展开讲解，日常使用过程中一般不会用到这个文件。  

#### 5.10 pick_black_lists.json & pick_white_lists.json
黑白名单配置，除软件自带的黑白名单外，你自己设置的黑白名单便存储在这里。
