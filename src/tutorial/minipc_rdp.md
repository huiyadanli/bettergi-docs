# BetterGI小主机远程桌面自动挂机教程

## 一、安装设置系统

首先安装支持远程桌面被控的win11，我这里安装了win11企业版LTSC，可以去这个网站下载[HelloWindows.cn - 精校 完整 极致 Windows系统下载仓储站](https://hellowindows.cn/)，网上搜索激活方式就能激活

然后设置系统，用本地用户，设置一个密码，然后不要设置pin码

电源管理方面设置永远不休眠永远不锁屏

设置开机不需要输入密码直接自动登录进入桌面！（这个很重要，否则关闭远程桌面后虚拟桌面会进入锁屏界面导致bg异常）

远程连接工具推荐1remote，可以在微软商店安装，注意设置组合键共享到远程桌面，设置远程桌面分辨率为1080p，因为远程桌面启动原神只能以屏幕分辨率运行

我们也可以先接上物理屏幕测试一下，远程连接启动bg和原神，关闭远程连接后bg会不会跳转到物理屏幕上继续运行

## 二、安装虚拟屏幕

远程连接关闭后原神出现分辨率跳到800x600问题的原因是没有系统没有屏幕了，所以tscon命令就虚拟出了一个800x600的模拟屏幕，所以我们需要给系统安装一个屏幕，具体就是在系统设置界面可以识别出来的一个屏幕，可以是虚拟屏幕，也可以2块钱买个hdmi诱骗器，我这里用这个开源的虚拟屏幕https://github.com/itsmikethetech/Virtual-Display-Driver/releases

接上物理屏幕后，安装好虚拟屏幕后显示设置里就会出现虚拟屏幕和物理屏幕两块，设置虚拟屏幕分辨率为1080p，这样当我们断开远程连接后bg会跳转到虚拟屏幕上继续运行

## 三、tscon断开远程连接

将这个脚本保存为bat格式放在桌面，这个脚本可以自动获得管理员权限，双击运行即可

```bat
:: 开始获取管理员权限
setlocal
set uac=~uac_permission_tmp_%random%
md "%SystemRoot%\system32\%uac%" 2>nul
if %errorlevel%==0 ( rd "%SystemRoot%\system32\%uac%" >nul 2>nul ) else (
    echo set uac = CreateObject^("Shell.Application"^)>"%temp%\%uac%.vbs"
    echo uac.ShellExecute "%~s0","","","runas",1 >>"%temp%\%uac%.vbs"
    echo WScript.Quit >>"%temp%\%uac%.vbs"
    "%temp%\%uac%.vbs" /f
    del /f /q "%temp%\%uac%.vbs" & exit )
endlocal
:: 完成获取,下面可以开始写你自己的代码了


set windowTitle=YuanShen
:: start /b sendKeys.bat "%windowTitle%" ""
ping 127.0.0.1 -n 20 >nul


for /f "skip=1 tokens=3" %%s in ('query user %USERNAME%') do (
  %windir%\System32\tscon.exe %%s /dest:console
)
```

然后先运行bg和原神，开始自动化跑后按快捷键暂停执行，然后win+D显示桌面，双击运行脚本，会弹出cmd命令行窗口，会在十几秒后自动断开远程连接，我们趁机马上切换到原神界面，并且按快捷键恢复脚本运行，然后等待自动断开远程连接，就可以关闭1remote窗口了

## 四、重连设置

当然可以用1remote重连上看看运行效果，但是断开连接还是要用第三步的方法。理论上可以用obs推流来实现无干扰方式监控运行效果，感兴趣的可以自己去探索



