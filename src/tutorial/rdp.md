# 本地远程多用户后台挂机指南
[RDP Wrapper CnC](https://github.com/sebaxakerhtc/rdpwrap) 是一个开源工具，用于在 Windows 系统上启用多用户远程桌面连接（RDP），适用于 Windows 7/8/10/11 系统。

## 重要提示
- 强烈不建议使用**任何第三方 Windows 系统修改**工具（包括所谓“优化大师”“一键精简”“系统瘦身”“预装软件移除”等工具）。此类工具极易导致本教程完全失效、关键功能异常或稳定性问题。

## 下载软件
从 GitHub 仓库下载最新版本，进入 [Releases](https://github.com/sebaxakerhtc/rdpwrap/releases/tag/v1.8.9.9) 页面下载 `RDPW_Installer.exe`，以防**安装过程中出现错误**或者将来不再使用 RDP Wrapper CnC ，可以下载 `RDPW_Uninstaller.exe`。
## 安装软件
### 安装前准备
该软件容易被部分安全软件误伤，所以在安装之前一定要保证**临时禁用**所有安全软件（包括 Defender），完成后再重新启用。
### 开始安装
右键以管理员身份运行 `RDPW_Installer.exe`，并等待控制台应用（黑色窗口）结束，此程序会自动安装并配置多用户远程桌面连接。
### 安装结束后检查
安装结束后在桌面生成快捷方式，并在 `C:\Program Files\RDP Wrapper` (无法修改安装目录，请不要自行尝试) 目录下生成五个文件，进入下一步之前请检查文件是否完整，如果不完整请检查你的 第一步 **安装前的准备** 是否完成。

![0f4d85a4df1de53e9928c2a497a0b734](https://github.com/user-attachments/assets/adfc54d2-b86c-45fd-9ab3-03c235ad1e59)

## 检查 RDP 服务状态
打开 `RDP_CnC.exe`（从上述目录中打开或者使用桌面快捷方式打开）。确认所有状态为绿色，如下图所示（正常状态时会显示 `termsrv ver.` 版本，`[support level]` 会显示 `Fully Supported`）。

![ee2e52bfb0ff98c77fc3f4d084d36f68](https://github.com/user-attachments/assets/9308e153-1adb-47a0-ade1-06e3db286c97)

如果有部分或者全部标红，尝试 `Update INI` 和 `Restart TermService` 修复问题，更多情况查看 Q&A 解决。

注：因为软件内置的 INI 文件比较老旧，大概率不支持现在最新的系统，所以可能至少要通过任何一种方式更新  `rdpwrap.ini` 。

## 建立 Windows 新用户
建议授予管理员权限，并设置密码。

以 Win11 24H2 为例，添加新用户的位置如下图所示。建立新用户之后至少通过切换账户登录一次完成基本的设置，进入桌面则表示基本设置已经完成。

![2597e73e6bc1b4f9b0303bcb4f3cba9b](https://github.com/user-attachments/assets/25a9edca-d681-445f-a10b-76010ba75e4c)

其他版本建立新用户的途径不同，请自行检索。
## 添加新用户到远程桌面用户组（可选）
- 你在 **建立 Windows 新用户** 步骤中，如果没有授予管理员权限，才需要进行该操作。
- 打开本地用户和组：
  - Win + R → 输入 `lusrmgr.msc` → 回车
- 添加用户到远程桌面用户组
  - 在左侧导航窗格中，展开 本地用户和组>组。
  - 在右侧窗格中，右键单击 `Remote Desktop Users`，选择`属性`。
  - 点击 `添加`，输入要添加的用户名，然后点击 `检查名称` 以验证用户名。
  - 确认无误后，点击“确定”完成添加。

![4fef15c6dcf691a46a21dd8631274e7c](https://github.com/user-attachments/assets/1d50ffa5-f4a8-4cf8-8082-ad3304356883)


## 启动本地远程连接
### 使用RDP_CnC 打开windows自带的本地远程
完成上述配置后，您可通过以下简易步骤建立远程连接：
- 打开 RDP_CnC.exe 程序界面；

![e29ee002ec82e835cb606666fb37837d](https://github.com/user-attachments/assets/a44f3aa8-e88c-4f9b-b58b-99f2c51b785e)
- 点击  `Restart TermService` 按钮（该操作将重启远程桌面服务）；
- 在分辨率设置中选择合适的分辨率（建议设置为 1920x1080 以适配 `BetterGI` 对分辨率的需求），这将打开远程连接的登录界面；

![9025a354be4cc6c3cbaa1c62f0cd565c](https://github.com/user-attachments/assets/f8977348-fd52-4947-a485-da6f48daa1ae)

- 输入远程ip：`127.0.0.2` (本地回环地址，指向本机，可选择 `127.0.0.2`- `127.0.0.254`)，输入预先创建的用户名和密码，点击确认。
- 成功连接后，将进入新建用户的独立桌面环境。若失败，请检查前面的所有步骤。
### 使用第三方远程桌面软件
如 `1Remote`, `SimpleRemote`，下面以 [1Remote](https://1remote.org/zh-cn/) 为例，演示连接过程。

![1Remote主界面](https://github.com/user-attachments/assets/e17cc9db-9fcc-400c-a6f5-5dfacfd3c759)

点击图中的加号，选择 `添加`。不出意外你能看到以下界面：

![1Remote添加界面](https://github.com/user-attachments/assets/b27935a5-93f3-4972-96d8-9b73c8e2d4f5)

根据喜好命名、选择图标和颜色之后，往下滚动页面，输入用户名，密码和远程ip: `127.0.0.2`，分辨率选择自定义分辨率（拉伸），1920*1080。如图：

![1](https://github.com/user-attachments/assets/69ea322a-eaad-40e3-94c7-5aa0e6b5b57a)

![12](https://github.com/user-attachments/assets/92d18db7-1264-4cbc-bbcd-0531bcd353a3)

点击 `添加` 或者 `保存` 即可。随后在主界面双击你刚刚创建的本地远程连接，点击 `确定` 即可成功连接

![123](https://github.com/user-attachments/assets/7e3defe8-40e3-4ea3-b764-09bce4c565fd)

## 免责声明
本教程仅用于技术研究及合法多用户协作场景，请遵守微软远程桌面协议（RDP）许可条款。滥用可能导致系统安全风险或违反用户协议。

## Q&A: 
1. `termsrv ver.` 为空如何确定自己的版本？找到版本之后如何确定自己的版本是否支持？
- 找到 `C:\Windows\System32\termsrv.dll` 文件，右键属性，选择详细信息，产品版本即是 `termsrv ver.` 。

![43c41ae564d5bfc01ba7150af9d41d1e](https://github.com/user-attachments/assets/eac4d80e-ad29-4231-ad57-9e6eaea41c68)
- 使用任意文本编辑器打开 `C:\Program Files\RDP Wrapper\rdpwrap.ini`，搜索对应的版本号，如果有说明你的 Windows 版本是支持的，如果没有请移步 Q&A 2.

![c4446d5cfe832d4eafac3f184d64ac77](https://github.com/user-attachments/assets/4b838090-7866-465f-883d-1be7d2407048)

2.  RDP Wrapper 提示 `Not Support` 、通过 Q&A 1. 确定自己的版本不受支持或者更新Windows版本之后 RDP Wrapper 不再可用怎么办？
- 首先尝试点击 `RDP_CnC.exe` 中的 `Update INI` ，这会通过直连 github 尝试更新  `rdpwrap.ini` 文件。若失败，尝试从 github 上下载最新的 [rdpwrap.ini](https://github.com/sebaxakerhtc/rdpwrap.ini) 替换 `C:\Program Files\RDP Wrapper\rdpwrap.ini` 文件。
- 若如果通过 Q&A 1. 中的方法确定新的  `rdpwrap.ini` 文件中仍然是不支持的 Windows 版本，尝试使用工具 [RDPWrapOffsetFinder](https://github.com/llccd/RDPWrapOffsetFinder)。使用方法，下载解压之后，在下载的目录打开 cmd：

![b86fca0b04eee4ef9d47b2b370f1c572](https://github.com/user-attachments/assets/e1b542ec-700b-414b-96c9-d00a963caebe)

- 运行以下命令：
```bash
.\RDPWrapOffsetFinder.exe C:\Windows\System32\termsrv.dll
```
把生成的文本复制粘贴放到 `rdpwrap.ini` 的末尾，**然后再文件末尾添加一个回车**。再次尝试连接本地远程。该工具并不能处理所有情况，出现问题请向 RDP Wrapper 的官方社区求助。

3. 连接远程桌面时出现提示【用户帐户限制(例如，时间限制)会阻止你登录。请与系统管理员或技术支持联系以获取帮助。】怎么办？

![87b89bc678de68fc850eb3f72e2e8b7b](https://github.com/user-attachments/assets/03140d9b-b843-4442-b5dd-4219b9e4c5d2)

- 发生原因是未设置新用户的密码，可以通过以下两种方法之一解决。
  - 删除原账户，重新建立有密码的账户，重新尝试登录（推荐）。
  - 修改本地安全设置（强烈不推荐，存在重大安全风险）。Win + R → 输入 `secpol.msc` → 回车。导航到以下路径：安全设置 → 本地策略 → 安全选项 → 账户: 使用空密码的本地帐户只允许进行控制台登录。修改为 已禁用。



![79a500a6872b69efe09540933817b0b4](https://github.com/user-attachments/assets/54415f20-fff9-4810-9e02-a5141ea34403)


4. 为什么使用本地远程玩游戏的时候无法转动视角？
- 正常现象。远程桌面软件都用的是绝对鼠标逻辑，减少需要发生的包数目。

5. 为什么最小化窗口之后出现问题？
- 不要最小化。放在第二桌面，或者放在副屏（或虚拟屏幕），或者用其他窗口挡住。

6. 远程桌面怎么 Win 和 Alt + Tab 等组合键？
- 全屏才能使用这些组合键。如果你的屏幕是 4K 或者 2K，请尝试以全屏方式启动本地远程桌面，也可通过虚拟屏幕工具获得你想要的分辨率，将窗口放在能全屏的窗口内。

7. 我想关闭屏幕省电，但是关闭屏幕之后不运行了怎么办？
- 使用 HDMI 线连接显示器。笔记本用户请自行探索。

8. 使用本地远程时频繁出现以下提醒怎么办？
![错误提示](https://github.com/user-attachments/assets/7f64ad91-6846-4de1-a464-1aac073362df)

在脚本仓库订阅 `1Remote_RDP_Autoreconnection` 参考其中的 `README.md` 配置。








