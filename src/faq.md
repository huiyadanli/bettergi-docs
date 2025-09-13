---
title: 常见问题
icon: circle-question
order: 40
---

如果查看了本文档仍旧无法解决你的问题，可以在[Issue](https://github.com/babalae/better-genshin-impact/issues)查阅是否有相似问题，如果无相似问题可以通过Issue提问。

查阅文档没有结果，也可以通过[用户社区](/community.html)进行提问


### 1.怎么下载？

#### ❓Github 下载太慢/下载失败

可以使用下面的公益加速服务：

[https://moeyy.cn/gh-proxy/](https://moeyy.cn/gh-proxy/)

[https://github.abskoop.workers.dev/](https://github.abskoop.workers.dev/)

[https://gitmirror.com/files.html](https://gitmirror.com/files.html)

#### ❓找不到下载文件的位置？不知道下载哪个文件/版本？
BetterGI 在 Github 页面提供了多个版本，主要是<b>安装版</b>和<b>便携版</b>，不同版本除了打包与安装方式之外，无任何区别。

在本页面额外提供了另外的安装版本，具体区别见下方说明。

下载位置在更新日志下方：

![](https://img.alicdn.com/imgextra/i3/2042484851/O1CN01wOmGAH1lhoM2iZrGa_!!2042484851.png)

* **安装版（新在线版）** 的文件名是 `BetterGI.OnlineInst.exe`，自动选择优路线下载并安装。（当前只在本页面提供）
* **安装版（新离线版）** 的文件名是 `BetterGI.Install.版本号.exe`，安装速度比下面的安装版更快，且会自动更新到新版本。
* ~~**安装版** 的文件名是 `BetterGI_Setup_v版本号.exe`，安装后会自动在开始菜单创建快捷方式。如果你不知道解压缩是什么操作，请使用这个版本。~~ （已不再提供）
* **便携版** 的文件名是 `BetterGI_v版本号.7z` （老版本是`zip`压缩包），解压并运行 `BetterGI.exe` 即可。

有更高版本号的情况下优先下载更高版本号的 BetterGI！

### 2.怎么启动？
#### ❓启动软件提示安装.NET运行时？

提示如图：

![](https://img.alicdn.com/imgextra/i3/2042484851/O1CN012MVMsp1lhoDtEX1bo_!!2042484851.jpg)

请根据提示安装，否则无法启动软件。

没有提示，也进不去？手动安装下载：[.NET 8 运行时](https://dotnet.microsoft.com/zh-cn/download/dotnet/thank-you/runtime-desktop-8.0.16-windows-x64-installer)

#### ❓无论是自动拾取，还是自动剧情都没反应，也没有日志打印。
在启动页内尝试更换截图方式。

### 3.无法使用
#### ❓云原神无法使用？
请注意当前只支持PC端云原神，**不支持网页版云原神**。使用时请注意：
1. 只能使用 `WindowsGraphicsCapture` 的截图方式
2. 云原神有三个窗口，可能自动识别到的窗口不正确，请使用“启动”页中的“手动选择窗口”功能来选择正确的云原神窗口

#### ❓以前好好的，突然所有功能不能用了？
如果你使用的截图方式是 `BitBlt` ，大概率是 Win11 更新导致 窗口化游戏优化 自动开启。

BetterGI 启动后会自动修改 窗口化游戏优化 为关闭状态，但是在原神启动状态下的修改是不会实时生效的，也就是说：**你只需要重启原神后重试即可！**

更多相关内容可以见此Issue：[Win11下 BitBlt截图方式不可用的解决方法](https://github.com/babalae/better-genshin-impact/issues/92)

#### ❓使用自动拾取的时候能看到拾取的日志，但是没有按F键拾取？
1. 请确认是以管理员权限启动软件。
2. 模拟操作部分可能被部分安全软件拦截，请关闭安全软件或加入白名单！已知 360安全卫士、提高了拦截强度的 WindowsDefender 会拦截部分类型的模拟点击。

#### ❓自动拾取可以使用，为什么自动剧情没反应？
游戏内的自动剧情功能打开时，BetterGI 的自动剧情才会启用。也就是游戏左上角的“自动”按钮处于“播放中”状态。


### 4.报错相关
#### ❓报错提示 "Some simulated input commands were not sent successfully..."

早期版本提示 "Some simulated input commands were not sent successfully..."

最新版本提示 "模拟键鼠消息发送失败！..."

模拟操作部分可能被部分安全软件拦截，请关闭安全软件或加入白名单！已知 360安全卫士、提高了拦截强度的 WindowsDefender 会拦截部分类型的模拟点击。

#### ❓任务结束后提示"没有检测到Starward协议注册"
[Starward](https://github.com/Scighost/Starward)是一款米哈游旗下游戏的第三方启动器，该启动器内有游戏时间记录功能，当使用Starward的自定义启动程序启动BGI时，计时功能会失效。

BGI提供了一个选项，开启后即可正常计时，该选项位于“同时启动原神”下。

如果你没有安装 Starward 并开启了这个选项，就会出现这个提示。

这个提示不会对脚本运行造成影响。

如果你安装了 Starward ，可以在此处开启 URL 协议注册后使用本功能在 Starward 中记录游戏时间。

![](https://img.alicdn.com/imgextra/i1/2042484851/O1CN01OhV0qp1lhoMyxY401_!!2042484851.jpg)

#### ❓首次启动时，任意功能没反应/七圣召唤卡卡在“选择初始手牌”/自动钓鱼没有“进入自动钓鱼”日志
在启动页内尝试更换截图方式。可以先测试自动拾取，完全没日志打印的话，换截图方式重试。不断的打印物品日志但是不按F拾取的话，请关闭安全软件。

#### ❓使用其他软件解锁120帧后软件失效？
在启动页内尝试更换截图方式。

#### ❓Windows 11 下，无法使用 `BitBlt` 截图方式？
参考：[#92](https://github.com/babalae/better-genshin-impact/issues/92) 设置后重试。但是修改这个设置后，可能会造成游戏性能下降。

#### ❓提示“PaddleOcr预热失败”应该如何解决？

造成这个问题原因有很多种，以下罗列相关的解决方式，请自行判断，如果依旧无法解决，可以提[Issue](https://github.com/babalae/better-genshin-impact/issues)并附上报错截图。

关于这个问题的更多讨论：[#132](https://github.com/babalae/better-genshin-impact/issues/132)

* 情况一：把 BetterGI 解压到了桌面或者中文路径下可能会出现这个问题（大部分系统不会出现这个问题），**请移动到非桌面的全英文路径下重试**。 
* 情况二：把系统编码修改成了 `UTF-8`，请修改回默认系统编码后重试。取消勾选下图中的选项即可。

<img src="https://img.alicdn.com/imgextra/i3/2042484851/O1CN015buXNA1lhoDy0eQNI_!!2042484851.png" width="400"  alt=""/>

* 情况三：
    * case1:提示 `onnxruntime.dll: FAIL, handle=0` 的情况下，请安装VC++运行库，官方下载地址：[vc_redist.x64.exe](https://aka.ms/vs/17/release/vc_redist.x64.exe)
    * **case2:提示 Unable to load DLL 'onnxruntime'or one of its dependencies: 动态链接库(DLL)初始化例程失败。(0x8007045A) 的情况下，也请安装VC++运行库，官方下载地址：[vc_redist.x64.exe](https://aka.ms/vs/17/release/vc_redist.x64.exe)**

<img src="https://img.alicdn.com/imgextra/i1/2042484851/O1CN01IZWCZS1lhoDsGexCV_!!2042484851.png" width="400"  alt=""/>


* 情况四：如下图提示 `onnxruntime.dll: OK, handle=0`,但是 `mkldnn.dll: FAlL, handle=0` 的情况下，说明 ONNX 可能用不了，只能补充其他方式进行使用。**请不要和情况三混淆！**。进入 [wwk.lanzouq.com/ioU1f1tvgnwd](https://wwk.lanzouq.com/ioU1f1tvgnwd) 后，下载并解压，然后把里面的4个dll放到软件根目录，并覆盖。参考：[#283](https://github.com/babalae/better-genshin-impact/issues/283) 

<img src="https://img.alicdn.com/imgextra/i2/2042484851/O1CN01PsmEhr1lhoG8SQ8tS_!!2042484851.png" width="400"  alt=""/>


* 情况五：缺失 windows sdk 也有可能出现这个报错，官方下载安装地址：[windows-sdk](https://developer.microsoft.com/zh-cn/windows/downloads/windows-sdk/)

#### ❓报错提示“Could not find a part of the path：............."
 **如果你是首次运行bgi**请先启动运行一次程序，若无法解决该问题，请手动添加相应的文件夹  
 **如果不会添加**请将文件删除干净，重新下载安装包，重新安装或解压，若仍然无法解决问题，请前往社区寻求帮助。 

#### ❓Error: NO_HASH_ALGO_ERR: No hash algorithm specified。
解决方案：关掉后重试一次，手动运行BetterGl.update.exe（此时打开软件应该已经是最新版了）。如果还是不行，可以直接重新下载安装包安装。

#### ❓Unable to load DLL 'onnxruntime'or one of its dependencies: 动态链接库(DLL)初始化例程失败。(0x8007045A)。
解决方案：请安装VC++运行库，官方下载地址： https://aka.ms/vs/17/release/vc_redist.x64.exe


### 5.其他
#### ❓重启后程序被删除了是什么情况？
卸载的时候由于文件被占用等问题，会下次重启后删除。（卸载程序会提示：“存在部分文件删除失败，这些文件将在下次重启后自动删除。”）

如果你不重启，然后使用新的安装包进行覆盖安装就会出现此类情况。

如果只是为了更新 BetterGI，直接覆盖安装即可，无需卸载后重新安装！

#### ❓为什么需要管理员权限？
因为游戏是以管理员权限启动的，软件不以管理员权限启动的话没有权限模拟鼠标点击。

软件双击打开会有UAC以管理员权限启动提示，如果无提示请 右键——以管理员权限启动 ，否则可能无法正常使用 BetterGI 。

#### ❓会不会封号？
理论上不会被封。 **BetterGI 不会做出任何修改游戏文件、读写游戏内存等任何危害游戏本体的行为，单纯依靠视觉算法和模拟操作实现。** 但是mhy是自由的，用户条款上明确说明第三方软件/模拟操作是封号理由之一。当前方案还是存在被检测的可能。只能说请低调使用，请不要跳脸官方。  
