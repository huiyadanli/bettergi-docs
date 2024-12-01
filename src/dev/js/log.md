---
title: 日志
order: 30
---

## 日志 log

打印日志，支持占位符

举例：
```js
log.info('开始捕捉晶蝶，请在队伍中务必携带{zy}，使用成男/成女角色', '早柚');
```

### debug(string? message, params object?[] args)
- 描述: 在遮罩日志窗口输出调试级别的信息
- 参数:
  - `message` (`string?`): 日志消息
  - `args` (`object?[]`): 日志参数

### info(string? message, params object?[] args)
- 描述: 在遮罩日志窗口输出信息级别的信息
- 参数:
  - `message` (`string?`): 日志消息
  - `args` (`object?[]`): 日志参数

### warn(string? message, params object?[] args)
- 描述: 在遮罩日志窗口输出警告级别的信息
- 参数:
  - `message` (`string?`): 日志消息
  - `args` (`object?[]`): 日志参数

### error(string? message, params object?[] args)
- 描述: 在遮罩日志窗口输出错误级别的信息
- 参数:
  - `message` (`string?`): 日志消息
  - `args` (`object?[]`): 日志参数


