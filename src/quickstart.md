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
