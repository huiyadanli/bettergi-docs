---
title: Javascript 脚本
order: 10
---

::: warning 注意

文档建设中

:::

BetterGI 通过 [ClearScript](https://github.com/microsoft/ClearScript) 内置 V8 引擎，支持直接运行 Javascript 编写的脚本，并开放各类 BetterGI 的 API。

所有脚本存储在软件根目录 `\Script` 路径下。脚本仓库：[bettergi-scripts](https://github.com/babalae/bettergi-scripts)。


## 当前已有脚本

| 目录名            | 名称         | 描述                                                             | 作者                                           |
| -------------- | ---------- | -------------------------------------------------------------- | -------------------------------------------- |
| AutoCrystalfly | 自动采集晶蝶(枫丹) | BetterGI自带脚本，自动采集离传送点较近的晶蝶。请在队伍中务必携带早柚，使用成男/成女角色。并保证所有传送点都已经激活！ | [@huiyadanli](https://github.com/huiyadanli) |
| JustTp         | 只是传送一下     | BetterGI自带脚本，只用于传送。方便在调度器配合键鼠脚本使用（[如何获取传送点位？](https://github.com/babalae/bettergi-scripts/issues/1)）                         | [@huiyadanli](https://github.com/huiyadanli) |
| AutoArtifacts  | 自动狗粮       | 自动调查离传送点较近的狗粮。请使用琳妮特前台，双风共鸣。并保证所有传送点都已经激活！                     | [@HZYgrandma](https://github.com/HZYgrandma) |


## 常见问题

* 执行脚本时直接发生异常：Error：当前不在地图界面
  * 请确保你打开地图的按键是M键
* 传送完成后角色站在原地不动？
  * 请确保游戏左上角派蒙头像未被其他悬浮窗遮挡
* 运行键鼠脚本时候方向有较大偏差？(自动采集晶蝶/自动狗粮)
  * 请确保游戏以60帧运行
  * 请确保游戏视角灵敏度保持默认（默认值是3）
* 运行自动晶蝶脚本时传送过去晶蝶已经飞走了？(自动采集晶蝶)
  * 请确保队伍中带有早柚/瑶瑶
* 运行狗粮脚本时会差一点距离，或者走过头？(自动狗粮)
  * 请确保运行时是琳妮特前台且拥有双风共鸣（元素共鸣需要四个角色组队触发，只带两个风系角色是没用的），且队伍中没有其他移速天赋加成的角色
* 晶蝶抓不齐/狗粮没调查到/调查了不捡？
  * 自动晶蝶和自动狗粮在走到目的地时没有任何图像识别，无法保证百分百获取
