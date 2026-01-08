---
title: 键鼠回调
order: 70
---

## 概述

KeyMouseHook 类用于将键鼠事件回调暴露给 JavaScript 层，允许 JS 代码监听和处理键盘和鼠标事件。

## 获取对象

```javascript
// 需手动初始化 keyMouseHook
const keyMouseHook = new KeyMouseHook()

//脚本结束前，记得释放资源！
keyMouseHook.dispose()
```

## 方法说明

### 1. 键盘事件

#### OnKeyDown(callback, useCodeOnly = true)

注册键盘按下事件回调。

**参数**：
- `callback`：回调函数，接收按键信息
- `useCodeOnly`：是否仅返回KeyCode，默认为 `true`（仅返回KeyCode），设置为 `false` 时返回KeyData

#### OnKeyUp(callback, useCodeOnly = true)

注册键盘释放事件回调。

**参数**：同 `OnKeyDown`

**示例**：
```javascript
// 注册键盘按下事件，仅返回KeyCode
keyMouseHook.OnKeyDown(function(keyCode) {
    log.info("Key down:{keyCode}", keyCode);
});

// 注册键盘释放事件，返回完整KeyData（包含组合键）
keyMouseHook.OnKeyUp(function(keyData) {
    log.info("Key up:{keyData}", keyData);
}, false);
```

### 2. 鼠标事件

#### OnMouseDown(callback)

注册鼠标按下事件回调。

**参数**：
- `callback`：回调函数，接收三个参数：
    - `button`：字符串类型，表示按下的鼠标按钮（Left, Right, Middle等按键）
    - `x`：数字类型，表示鼠标的 X 坐标
    - `y`：数字类型，表示鼠标的 Y 坐标

#### OnMouseUp(callback)

注册鼠标释放事件回调。

**参数**：同 `OnMouseDown`

#### OnMouseMove(callback, interval = 200)

注册鼠标移动事件回调。

**参数**：
- `callback`：回调函数，接收两个参数：
    - `x`：数字类型，表示鼠标的 X 坐标
    - `y`：数字类型，表示鼠标的 Y 坐标
- `interval`：回调间隔时间（毫秒），默认200ms

#### OnMouseWheel(callback)

注册鼠标滚轮事件回调。

**参数**：
- `callback`：回调函数，接收三个参数：
    - `delta`：数字类型，表示滚轮滚动的 delta 值（正数表示向上滚动，负数表示向下滚动）
    - `x`：数字类型，表示鼠标的 X 坐标
    - `y`：数字类型，表示鼠标的 Y 坐标

**示例**：
```javascript
// 注册鼠标按下事件
keyMouseHook.OnMouseDown(function(button, x, y) {
    log.info(`Mouse down: ${button} at (${x}, ${y})`);
});

// 注册鼠标移动事件，默认间隔200ms
keyMouseHook.OnMouseMove(function(x, y) {
    log.info(`Mouse moved to (${x}, ${y})`);
});

// 注册鼠标移动事件，自定义间隔100ms
keyMouseHook.OnMouseMove(function(x, y) {
    log.info(`Fast mouse move: (${x}, ${y})`);
}, 100);

// 注册鼠标滚轮事件
keyMouseHook.OnMouseWheel(function(delta, x, y) {
    log.info(`Mouse wheel: delta=${delta} at (${x}, ${y})`);
});
```

### 3. 通用方法

#### RemoveAllListeners()

移除所有注册的事件监听器。

**参数**：无

**示例**：
```javascript
// 移除所有事件监听器
keyMouseHook.RemoveAllListeners();
```

## 完整示例

```javascript
// 注册键盘事件
keyMouseHook.OnKeyDown(function(keyData) {
    log.info("Key down:{keyData}", keyData);
    
    // 检测组合键
    if (keyData.includes("Control") && keyData.includes("V")) {
        log.info("Ctrl 和 V 被按下"); //注意这里并不代表只有这两个键被按下
    }
    
    // 检测单个按键
    if (keyData === "Escape") {
        log.info("Escape key pressed, removing all listeners");
        keyMouseHook.RemoveAllListeners();
    }
});

keyMouseHook.OnKeyUp(function(keyData) {
    log.info("Key up:{keyData}", keyData);
});

// 注册鼠标事件
keyMouseHook.OnMouseDown(function(button, x, y) {
    log.info(`Mouse down: ${button} at (${x}, ${y})`);
});

keyMouseHook.OnMouseUp(function(button, x, y) {
    log.info(`Mouse up: ${button} at (${x}, ${y})`);
});

// 注册鼠标移动事件，间隔200ms
keyMouseHook.OnMouseMove(function(x, y) {
    log.info(`Mouse moved to (${x}, ${y})`);
});

// 注册鼠标滚轮事件
keyMouseHook.OnMouseWheel(function(delta, x, y) {
    log.info(`Mouse wheel: delta=${delta} at (${x}, ${y})`);
});
```

## 注意事项

### 事件触发频率
- 鼠标移动事件默认间隔为200ms，可通过 `interval` 参数调整
- 建议根据实际需求调整间隔时间，避免过高频率影响性能

### 返回值
- 键盘事件：`useCodeOnly=true` 时返回单个按键字符串（如"Escape"），`useCodeOnly=false` 时返回包含组合键的字符串（如"V, Control"）
- 鼠标事件：返回坐标和按钮信息

### 多个回调
- 支持为同一个事件注册多个回调函数，所有注册的回调都会被依次执行

### 资源释放
- 在脚本结束时，一定要调用 `Dispose()` ！！！
- 在脚本结束时，一定要调用 `Dispose()` ！！！
- 在脚本结束时，一定要调用 `Dispose()` ！！！
- 当JS脚本停止运行时，如果未释放资源，会打印一个错误日志，**大部分情况**下会自动释放资源，但**仍建议**手动释放！



## 方法速查表

| 事件类型 | 方法名 | 参数 | 默认值 |
|----------|--------|------|--------|
| 键盘按下 | OnKeyDown | callback, useCodeOnly | true |
| 键盘释放 | OnKeyUp | callback, useCodeOnly | true |
| 鼠标按下 | OnMouseDown | callback | - |
| 鼠标释放 | OnMouseUp | callback | - |
| 鼠标移动 | OnMouseMove | callback, interval | 200 |
| 鼠标滚轮 | OnMouseWheel | callback | - |
| 通用 | RemoveAllListeners | - | - |
| 通用 | Dispose | - | - |
