---
title: 通知
order: 40
---


## 支持通知方式

* Webhook 通知
* Windows 通知（注意：通知框可能会造成原神无法获取焦点）
* 飞书通知
* 邮件通知
* websocket通知

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

## 邮件通知配置教程
底下以qq邮箱为例，如何配置邮箱通知，这些内容不会上传云端，请放心填写。  

在配置邮箱通知前，首先你需要了解并获得如下内容：  
* `SMTP服务器地址` : qq邮箱为smtp.qq.com
* `SMTP服务器端口` : qq邮箱为587
* `SMTP用户名` : 你的qq邮箱地址
* `SMTP密码` : qq邮箱的授权码——关于如何获得授权码请访问[这里](https://service.mail.qq.com/detail/0/75)
* `发件人邮箱` : 你的qq邮箱地址
* `发件人姓名` : 这个随意
* `收件人邮箱` : 你需要接受通知的邮箱地址
当你获得这些内容后，就可以在设置中填写这些内容了。  
配置完毕后发送测试通知，当邮箱接收到通知时，说明配置成功。  
测试通知示例如下:  
![img.png](../assets\smtp.jpg)
