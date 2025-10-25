---
title: 后台消息模拟
order: 55
---

## 后台消息模拟 PostMessage

后台消息模拟功能，可以在游戏窗口不处于前台时发送键盘和鼠标消息。这对于需要后台运行的任务非常有用。

> 注意：PostMessage 与 [全局方法](/dev/js/global.html) 中的键盘鼠标操作不同：
> - **PostMessage**: 后台操作，游戏窗口不需要处于前台
> - **全局方法**: 前台操作，需要游戏窗口处于前台

### 基本用法

```js
// 创建PostMessage实例
const postMessage = new PostMessage();

// 后台按键操作
postMessage.keyDown("W");
await sleep(1000);
postMessage.keyUp("W");

// 后台鼠标点击
postMessage.click();
```

## 方法

### keyDown(key)
- 描述: 后台按下指定键
- 参数:
  - `key` (`string`): 要按下的键，具体可用参数见 [虚拟键代码表](/feats/append/keycodes.html)

### keyUp(key)
- 描述: 后台释放指定键
- 参数:
  - `key` (`string`): 要释放的键，具体可用参数见 [虚拟键代码表](/feats/append/keycodes.html)

### keyPress(key)
- 描述: 后台按下并释放指定键
- 参数:
  - `key` (`string`): 要按下并释放的键，具体可用参数见 [虚拟键代码表](/feats/append/keycodes.html)

### click()
- 描述: 后台点击鼠标左键

## 完整示例

```js
(async function() {
  try {
    // 创建PostMessage实例
    const postMessage = new PostMessage();
    
    // 后台移动
    postMessage.keyDown("W");
    await sleep(2000);
    postMessage.keyUp("W");
    
    // 后台跳跃
    postMessage.keyPress("SPACE");
    await sleep(500);
    
    // 后台攻击
    postMessage.keyPress("J");
    await sleep(1000);
    
    // 后台点击
    postMessage.click();
    
    log.info("后台操作完成");
    
  } catch (error) {
    log.error(`后台操作失败: ${error.message}`);
  }
})();
```

## 注意事项

1. **后台运行**：PostMessage可以在游戏窗口不处于前台时工作
2. **键码支持**：支持所有标准虚拟键代码
3. **性能**：后台消息比前台消息性能更好
4. **兼容性**：某些游戏可能对后台消息有限制
5. **错误处理**：建议使用try-catch处理可能的异常
