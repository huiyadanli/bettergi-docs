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

## 启动方式
命令行启动，需要注意文件夹路径。Windows系统注意用命令提示符而不是终端或者powershell.

```bash
BetterGI.exe start
```

URL启动，任意文件夹路径均可启动。如果你使用浏览器访问`bettergi://start`也可以启动。
```bash
start bettergi://start
```

## 启动参数
1. 使用一条龙

```bash
bettergi.exe startOneDragon
```

```bash
start bettergi://startOneDragon
```

2. 使用调度器
```bash
BetterGI.exe start --startGroups 切换队伍 关闭游戏
```
>解释：<br>
`切换队伍 关闭游戏`是你的调度器中**任务**的名字，多个任务执行使用空格分割。

目前仍未找到--startGroups的适用于URL自定义协议的启动方式。经过多次尝试失败。

:::info
以上命令均由[Because66666](https://github.com/Because66666)在betterGI的0.44.4版本上测试通过。之后可能有版本变动。