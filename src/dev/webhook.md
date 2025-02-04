---
title: Webhook 通知
order: 10
---


## 支持通知方式

* Webhook 通知
* Windows 通知（注意：通知框可能会造成原神无法获取焦点）
* 飞书通知

## Webhook 请求体


示例：

```json
{
  "event": "domain.end",
  "result": "Success",
  "timestamp": "2025-02-01 12:34:56",
  "screenshot": "base64EncodedImageString",
  "message": "自动秘境结束"
}
```

## 事件列表

* `notify.test` : 测试通知
* `domain.reward` : 自动秘境奖励
* `domain.start` : 自动秘境启动
* `domain.end` : 自动秘境结束
* `domain.retry` : 自动秘境重试
* `task.cancel` : 任务启动
* `task.error` : 任务错误
* `group.start` : 配置组启动
* `group.end` : 配置组结束
* `dragon.start` : 一条龙启动
* `dragon.end` : 一条龙结束
* `tcg.start` : 七圣召唤启动
* `tcg.end` : 七圣召唤结束
* `album.start` : 自动音游专辑启动
* `album.end` : 自动音游专辑结束
* `album.error` : 自动音游专辑错误

