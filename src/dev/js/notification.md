---
title: 发送通知
order: 35
---

## 通知发送接口 notification


### 权限配置

通知功能需要在调度器通用设置中启用"JS 通知权限"，并在脚本的manifest.json中配置：

```json
{
  "allow_js_notification": true
}
```

### 基本用法

```js
// 发送成功通知
notification.send("脚本执行完成");

// 发送错误通知
notification.error("脚本执行失败");
```

## 方法

### send(message)

- 描述: 发送成功通知
- 参数:
  - `message` (`string`): 通知消息
- 限制:
  - 消息长度不能超过500字符
  - 1分钟内最多发送5条通知
  - 不允许包含HTML标签和URL

### error(message)

- 描述: 发送错误通知
- 参数:
  - `message` (`string`): 通知消息
- 限制:
  - 消息长度不能超过500字符
  - 1分钟内最多发送5条通知
  - 不允许包含HTML标签和URL

## 完整示例

```js
(async function() {
  try {
    // 发送开始通知
    notification.send("开始执行自动采集任务");
    
    // 模拟一些工作
    await sleep(2000);
    
    // 发送完成通知
    notification.send("自动采集任务完成，共采集了10个物品");
    
  } catch (error) {
    // 发送错误通知
    notification.error(`任务执行失败: ${error.message}`);
  }
})();
```

## 注意事项

1. **频率限制**：1分钟内最多发送5条通知，超出限制的消息会被拦截
2. **内容验证**：不允许包含HTML标签、脚本标签和URL
3. **权限控制**：需要在调度器设置中启用JS通知权限
4. **消息长度**：单条消息不能超过500字符
5. **错误处理**：建议在关键操作前后发送通知，便于监控脚本执行状态

