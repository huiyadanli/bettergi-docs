---
title: 日志
order: 30
---

## 日志 log

打印日志，支持占位符

**由于普通用户是无法区分日志是否是脚本打印的，所有日志都相当于以BetterGI的名义打印的，请不要打印不合时宜的日志，包括但不限于下面场景：**
- 非必要情况下不要打印链接
- 禁止任何与软件脚本无关的aff、广告内容
- 禁止任何涉政、黄赌毒或者软件脚本无关内容
- 在日志窗口上打印奶龙
- 刷屏
- 等等不合时宜的内容...

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


