---
title: Javascript 脚本
order: 10
---

BetterGI 内部有大量原神自动化基础能力的包装，并可以通过 Javascript 书写的脚本进行调用，JS脚本通过 [ClearScript](https://github.com/microsoft/ClearScript) 内置 V8 引擎进行执行。

期望最终能够做到自动启动原神并完成所有脚本任务后自动关机。

所有脚本存储在软件根目录 `User\JsScript` 路径下。脚本仓库：[bettergi-scripts-list](https://github.com/babalae/bettergi-scripts-list) ( repo/js 路径下)。脚本仓库在线版：[https://bgi.sh](https://bgi.sh)

## 常见问题

* **运行键鼠脚本时候方向有较大偏差？**(JS自动采集晶蝶调用了键鼠脚本)
  * 请确保游戏视角灵敏度保持默认（默认值是3）
* **运行自动晶蝶脚本时传送过去晶蝶已经飞走了？**
  * 请确保队伍中带有早柚/瑶瑶/蓝砚
* **晶蝶抓不齐？**
  * 自动晶蝶在走到目的地时没有任何图像识别，无法保证百分百获取

## 脚本编写

见 [脚本编写](/dev/js/create.html)


## 附录

全地图传送点坐标合集，也是软件内置的所有传送点。（当前只有到 5.0 版本，新版本已经完全不同，仅供参考）

https://wwmy.lanzouq.com/b0fosbd9g 密码:coco


