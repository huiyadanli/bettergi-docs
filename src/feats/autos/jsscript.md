---
title: Javascript 脚本
order: 10
---

BetterGI 内部有大量原神自动化基础能力的包装，并可以通过 Javascript 书写的脚本进行调用，JS脚本通过 [ClearScript](https://github.com/microsoft/ClearScript) 内置 V8 引擎进行执行。

期望最终能够做到自动启动原神并完成所有脚本任务后自动关机。

所有脚本存储在软件根目录 `User\JsScript` 路径下。脚本仓库：[bettergi-scripts-list](https://github.com/babalae/bettergi-scripts-list) ( repo/js 路径下)。脚本仓库在线版：[https://bgi.sh](https://bgi.sh)

## 使用示例

有些js自带设置，需要用户在使用前进行设置，我们以地脉花为例

点击配置器，加入对应js脚本，然后右键单击，出现菜单栏后，再点击修改js脚本自定义配置

![调度器js(1)](https://github.com/user-attachments/assets/d96777a1-f5be-4551-a592-8c2e76d80ba3)

设置完成后，点击关闭即可保存配置。

![调度器js-2](https://github.com/user-attachments/assets/5eea7b6a-bd56-4fa2-a94f-fd43fcd9d3a2)

## 常见问题

### ❓运行键鼠脚本时候方向有较大偏差？
  * JS自动采集晶蝶调用了键鼠脚本
  * 请确保游戏视角灵敏度保持默认（默认值是3）

### ❓运行自动晶蝶脚本时传送过去晶蝶已经飞走了？
请确保队伍中带有早柚/瑶瑶/蓝砚。

### ❓晶蝶抓不齐？
自动晶蝶在走到目的地时没有任何图像识别，无法保证百分百获取。

### ❓狗粮批发为什么会用稻妻的大炮？
请阅读狗粮批发的README了解脚本运行机制。

### ❓游逸旅闻没有新角色吗？
版本更新初期作者需要收集大量点位，梳理角色剧情顺序，所有点位加在一起工作量非常大，甚至有可能完不成，因此欢迎你来帮助作者，加速制作。

### ❓如果我有多个账号怎么自动切换账号？
请搜索切换账号js脚本并配合调度器一起使用。

## 脚本编写

见 [脚本编写](/dev/js/create.html)


## 附录

全地图传送点坐标合集，也是软件内置的所有传送点。（当前只有到 5.0 版本，新版本已经完全不同，仅供参考）

https://wwmy.lanzouq.com/b0fosbd9g 密码:coco


