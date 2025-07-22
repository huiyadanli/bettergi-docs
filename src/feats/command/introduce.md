---
title: 命令行启动
# icon: rocket
order: 1
author:   [{
    name: "Because66666",
    url: "https://github.com/Because66666"
  }]
date: 2025-05-04
---

## 一、启动方式

命令行启动，需要注意文件夹路径。Windows系统注意用命令提示符而不是终端或者powershell.

```bash
BetterGI.exe start
```

URL启动，任意文件夹路径均可启动。如果你使用浏览器访问`bettergi://start`也可以启动。

```bash
start bettergi://start
```

通过此种方式，视同双击打开后，点击「启动」页面上的「启动」按钮。

## 二、启动参数
1. 使用一条龙

```bash
# 执行 BetterGI 一条龙页面上选定的配置
BetterGI.exe startOneDragon
BetterGI.exe --startOneDragon
start bettergi://startOneDragon

# 执行给定的一条龙配置（如果找不到就用页面上选定的）（需要 0.45.3 及以上版本）
BetterGI.exe startOneDragon <配置名称>
BetterGI.exe --startOneDragon <配置名称>
```

2. 使用调度器
```bash
BetterGI.exe --startGroups 切换队伍 关闭游戏
```
>解释：<br>
`切换队伍 关闭游戏`是你的全自动-调度器中**配置组**的名字，多个任务执行使用空格分割。

目前仍未找到--startGroups的适用于URL自定义协议的启动方式。经过多次尝试失败。


## 三、参考的批处理文件命令（保存为`run_script.bat`）

```bash
@echo off
:: 设置代码页为UTF-8
chcp 65001

::管理员权限检测
NET SESSION >nul 2>&1
if %errorlevel% neq 0 (
    echo 请右键以管理员身份运行此脚本！
    pause
    exit
)
:: 切换到指定目录
cd /d "D:\software\BetterGI"

:: 将系统静音
set srv=Audiosrv
net start | find "Windows Audio" >nul
if %errorlevel% equ 0 (
    net stop "%srv%" >nul && echo 已静音
) else (
    echo 当前已静音，无需操作
)

:: 执行BetterGI.exe程序
.\BetterGI.exe --startGroups 切换队伍 使用配置组执行一条龙 采钻石矿 关闭游戏


:: 取消系统静音
net start "Audiosrv"
cmd
```
