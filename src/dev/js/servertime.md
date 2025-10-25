---
title: 服务器时间
order: 45
---

## 服务器时间 ServerTime

服务器时间功能，可以获取原神服务器的时区偏移量，用于处理游戏内的时间相关操作。（此功能国服玩家可忽略）

### 基本用法

```js
// 获取服务器时区偏移量
const offset = ServerTime.getServerTimeZoneOffset();

// 创建服务器时间对象
const serverTime = new Date(Date.now() + offset);

// 获取服务器当前时间
const serverNow = new Date(Date.now() + ServerTime.getServerTimeZoneOffset());
```

## 方法

### getServerTimeZoneOffset()
- 返回类型: `int`
- 描述: 获取服务器时区偏移量
- 返回值: 以毫秒为单位的偏移量，可直接在JavaScript中使用
- 用法: `new Date(Date.now() + offset)`

## 完整示例

```js
(async function() {
  try {
    // 获取服务器时区偏移量
    const offset = ServerTime.getServerTimeZoneOffset();
    log.info(`服务器时区偏移量: ${offset} 毫秒`);
    
    // 创建服务器时间对象
    const serverTime = new Date(Date.now() + offset);
    log.info(`服务器当前时间: ${serverTime.toLocaleString()}`);
    
    // 检查是否为服务器时间
    const isServerTime = (date) => {
      const localOffset = date.getTime() - Date.now();
      return Math.abs(localOffset - offset) < 1000; // 允许1秒误差
    };
    
    // 获取游戏内时间（假设游戏内时间与服务器时间同步）
    const gameTime = new Date(Date.now() + offset);
    log.info(`游戏内时间: ${gameTime.toLocaleString()}`);
    
    // 计算到特定时间的剩余时间
    const targetTime = new Date("2024-01-01 00:00:00");
    const timeUntilTarget = targetTime.getTime() - (Date.now() + offset);
    
    if (timeUntilTarget > 0) {
      const hours = Math.floor(timeUntilTarget / (1000 * 60 * 60));
      const minutes = Math.floor((timeUntilTarget % (1000 * 60 * 60)) / (1000 * 60));
      log.info(`距离目标时间还有: ${hours}小时${minutes}分钟`);
    } else {
      log.info("目标时间已过");
    }
    
  } catch (error) {
    log.error(`服务器时间获取失败: ${error.message}`);
  }
})();
```

## 注意事项

1. **时区处理**：偏移量是相对于本地时间的毫秒数
2. **时间同步**：服务器时间可能与本地时间有差异
3. **精度**：偏移量精度为毫秒级别
4. **缓存**：建议缓存偏移量，避免频繁调用
5. **错误处理**：建议使用try-catch处理可能的异常
