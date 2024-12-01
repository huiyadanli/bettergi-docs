---
title: 原神相关
order: 40
---

## 原神 genshin

举例：
```js
// 传送
await genshin.tp('9041.2890625', '-2421.4799804688');
```


### width
- 类型: `int`
- 描述: 游戏宽度

### height
- 类型: `int`
- 描述: 游戏高度

### scaleTo1080PRatio
- 类型: `double`
- 描述: 游戏窗口大小相比1080P的缩放比例

### screenDpiScale
- 类型: `double`
- 描述: 系统屏幕的DPI缩放比例

### tp(string x, string y)
- 返回类型: `Task`
- 描述: 传送到指定位置
- 参数:
  - `x` (`string`): 目标位置的X坐标
  - `y` (`string`): 目标位置的Y坐标

