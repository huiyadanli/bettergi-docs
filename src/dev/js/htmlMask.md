---
title: HTML遮罩
order: 82
author: 躁动的氨气
date: 2026-3-30
---

## 概述

`HtmlMask` 用于在游戏窗口上叠加透明的 HTML 遮罩层，支持通过 WebView2 加载本地或远程 HTML 页面，并提供 JS 脚本与 HTML 页面之间的双向消息通信。

::: warning 注意

所有从webview中发出的在线网络请求都会被bgi拦截！包括在线图标！所属域名需在manifest.json中手动进行注册，与js中的注册机制完全相同。详见[HTTP请求](/dev/js/http.html)
本地请求仅允许访问当前js目录下的文件（图片、css样式等）。

:::

## 获取对象

```javascript
// 脚本结束时自动关闭所有遮罩窗口，也可以手动释放
htmlMask.show("https://example.com");
```

## 方法说明

### 1. 窗口管理

#### show(url, id)

显示 HTML 遮罩窗口，返回窗口 ID。

**参数**：
- `url`：字符串类型，HTML 页面地址，支持以下格式：
  - 远程地址：`"https://example.com"`（远程地址无法进行与js的数据通信）
  - 相对路径：`"assets/index.html"`（相对于脚本目录）
- `id`：字符串类型，可选，窗口唯一标识。指定 ID 时，若已存在同 ID 窗口则先关闭再重新创建

**返回值**：`maskID`：字符串类型，窗口 ID（未指定 id 时自动生成）

**示例**：
```javascript
const winId = htmlMask.show("assets/index.html");

// 使用自定义 ID
htmlMask.show("https://example.com", "my-overlay");

// 重新打开同 ID 窗口会先关闭旧的
htmlMask.show("https://example.com", "my-overlay");
```

#### close(id)

关闭指定窗口。

**参数**：
- `id`：字符串类型，窗口 ID

**返回值**：是否成功关闭，布尔类型

**示例**：
```javascript
const winId = htmlMask.show("assets/index.html");
htmlMask.close(winId);
```

#### closeAll()

关闭所有由当前脚本实例打开的窗口。

**参数**：无

**示例**：
```javascript
htmlMask.show("assets/page1.html");
htmlMask.show("assets/page2.html");
htmlMask.closeAll(); // 关闭所有
```

#### getWindowIds()

获取所有窗口 ID。

**返回值**：字符串数组

**示例**：
```javascript
const ids = htmlMask.getWindowIds();
log.info("当前窗口: {ids}", ids);
```

#### exists(id)

检查窗口是否存在。

**参数**：
- `id`：字符串类型，窗口 ID

**返回值**：布尔类型

**示例**：
```javascript
if (htmlMask.exists("my-overlay")) {
  log.info("窗口存在");
}
```

### 2. 消息通信

所有消息遵循统一的 JSON 格式（根据web api格式设计）：

```json
{
  "url": "/api/path",
  "data": { "key": "value" }
}
```

- `url`：接口路径，用于区分消息类型
- `data`：JSON 数据，可以是对象或字符串

#### send(windowId, url, jsonData)

向指定窗口的 HTML 页面单向推送消息。HTML 端通过 `window.htmlMask.onMessage` 回调接收。

**参数**：
- `windowId`：字符串类型，目标窗口 ID
- `url`：字符串类型，接口路径
- `jsonData`：字符串类型，JSON 格式的数据

**示例**：
```javascript
const winId = htmlMask.show("assets/index.html");

// 单向推送数据到 HTML
htmlMask.send(winId, "/data/update", JSON.stringify({ hp: 100, mp: 50 }));
htmlMask.send(winId, "/command/stop", JSON.stringify({ reason: "完成" }));
```

#### request(windowId, url, jsonData, timeoutMs)

向 HTML 发送请求并等待响应（`await`）。HTML 端通过 `window.htmlMask.onMessage` 接收，`onMessage` 的返回值会自动回传给 JS 端。

**参数**：
- `windowId`：字符串类型，目标窗口 ID
- `url`：字符串类型，接口路径
- `jsonData`：字符串类型，JSON 格式的数据
- `timeoutMs`：数字类型，可选，超时毫秒，默认 `0` 表示无限等待

**返回值**：字符串类型，HTML 端 `onMessage` 返回的 `data` 部分（JSON 字符串）；超时返回 `null`

**示例**：
```javascript
const winId = htmlMask.show("assets/index.html");

// 发送请求并等待 HTML 响应
var response = await htmlMask.request(winId, "/data/query", JSON.stringify({ key: "hp" }));
log.info("HTML响应: " + response); // {"hp":100,"mp":50}
```

#### receive(windowId, timeoutMs)

等待接收来自 HTML 的一条消息，阻塞直到有消息到达或超时。

**参数**：
- `windowId`：字符串类型，窗口 ID
- `timeoutMs`：数字类型，可选，超时毫秒，默认 `0` 表示无限等待

**返回值**：字符串类型，JSON 格式的消息对象；超时返回 `null`

**示例**：
```javascript
while (htmlMask.exists(winId)) {
    var msg = await htmlMask.receive(winId);
    if (msg) {
        var data = JSON.parse(msg);
        log.info("收到: url={url}", data.url);
    }
}
```

#### poll(windowId)

轮询获取一条来自 HTML 的消息（FIFO，非阻塞）。

**参数**：
- `windowId`：字符串类型，窗口 ID

**返回值**：字符串类型，JSON 格式的消息对象；无消息时返回 `null`

**示例**：
```javascript
const msg = htmlMask.poll(winId);
if (msg) {
    const data = JSON.parse(msg);
    log.info("收到: url={url}", data.url);
}
```

#### pollAll(windowId)

批量获取所有来自 HTML 的消息（非阻塞）。

**参数**：
- `windowId`：字符串类型，窗口 ID

**返回值**：字符串类型，JSON 格式的消息数组

**示例**：
```javascript
const messages = JSON.parse(htmlMask.pollAll(winId));
for (const msg of messages) {
    log.info("收到: url={url}, data={data}", msg.url, msg.data);
}
```

## HTML 端通信

系统会自动注入 `window.htmlMask` 对象，提供以下 API：

### 接收 JS 推送（onMessage）

设置 `onMessage` 回调以接收 JS 端 `send` 推送的消息。**返回值会自动作为响应回传给 JS 端的 `request` 调用**。

```html
<script>
window.htmlMask.onMessage = function(msg) {
    console.log('收到推送:', msg.url, msg.data);

    if (msg.url === '/data/query') {
        // 返回值自动回传，JS 的 await htmlMask.request() 会收到这个值
        return { hp: 100, mp: 50 };
    }
};
</script>
```

### 发送请求到 JS（request）

HTML 端也可以主动向 JS 发起请求并等待响应：

```html
<script>
(async function() {
    var result = await window.htmlMask.request('/user/hello', { text: '来自HTML的问候' });
    console.log('JS响应:', result.data);
})();
</script>
```

### 原始方式（兼容）

仍可使用 WebView2 原生 API 进行通信，但推荐使用 `window.htmlMask`：

```html
<script>
// 原始接收
window.chrome.webview.addEventListener('message', event => {
    const msg = JSON.parse(event.data);
    console.log('收到消息:', msg);
});

// 原始发送
window.chrome.webview.postMessage(JSON.stringify({
    url: "/event/click",
    data: { x: 100, y: 200 }
}));
</script>
```

## 完整示例

### JS 脚本端

```javascript
(async function () {
    await genshin.returnMainUi();

    const winId = htmlMask.show("assets/index.html");

    // await 请求 HTML 并等待响应
    var response = await htmlMask.request(winId, "/data/query", JSON.stringify({ key: "hp" }));
    log.info("HTML响应: " + response);

    // 单向推送
    htmlMask.send(winId, "/data/update", JSON.stringify({ hp: 0, mp: 0 }));

    // 持续接收 HTML 消息
    while (htmlMask.exists(winId)) {
        var msg = await htmlMask.receive(winId);
        if (msg) {
            var parsed = JSON.parse(msg);
            log.info("收到HTML消息: " + msg);
        }
    }

    htmlMask.close(winId);
})();
```

### HTML 页面端 (assets/index.html)

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            margin: 0;
            background: transparent;
            color: white;
            font-family: sans-serif;
        }
        .content {
            width: 200px;
            height: 300px;
            background: white;
        }
        #info {
            color: black;
            padding: 20px;
            font-size: 18px;
        }
    </style>
</head>
<body>
    <div class="content">
        <div id="info">等待消息...</div>
    </div>

    <script>
        // 接收 JS 推送，返回值自动回传给 JS 的 request
        window.htmlMask.onMessage = function(msg) {
            document.getElementById('info').innerText =
                '收到: ' + msg.url + ' -> ' + JSON.stringify(msg.data);

            if (msg.url === '/data/query') {
                return { hp: 100, mp: 50 };
            }
        };

        // 向 JS 发送请求并等待响应
        (async function() {
            var result = await window.htmlMask.request('/user/hello', { text: '来自HTML的问候' });
            document.getElementById('info').innerText += '\n响应: ' + JSON.stringify(result.data);
        })();
    </script>
</body>
</html>
```

## 注意事项

### 窗口
- 最多同时打开 **5** 个 HTML 遮罩窗口（打开过多窗口非常影响性能，请尽量使用数据通信的形式响应式更新内容）
- 遮罩窗口是**透明**、**置顶**、**点击穿透**的（不可交互）

### 生命周期
- JS 脚本结束时自动关闭所有遮罩窗口
- BetterGI 停止截图时自动关闭所有遮罩窗口

### WebView2 数据
- 每个脚本在各自目录下维护独立的 WebView2 缓存目录，不会互相干扰

### 消息时机
- 页面未加载完成时，发送的消息会被暂存在队列中，页面加载完成后自动推送

## 方法速查表

| 类别 | 方法名 | 参数 | 返回值 |
|------|--------|------|--------|
| 窗口 | show | url, id? | maskID |
| 窗口 | close | id | bool |
| 窗口 | closeAll | - | void |
| 窗口 | getWindowIds | - | string[] |
| 窗口 | exists | id | bool |
| 通信 | send | windowId, url, jsonData | void |
| 通信 | request | windowId, url, jsonData, timeoutMs? | string? |
| 通信 | receive | windowId, timeoutMs? | string? |
| 通信 | poll | windowId | string? |
| 通信 | pollAll | windowId | string |
