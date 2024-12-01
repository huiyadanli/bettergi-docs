---
title: 调用其他脚本
order: 50
---

## 路径追踪 pathingScript

### run(string json)
- 描述: 运行路径追踪任务
- 参数:
  - `json` (`string`): 自动路径任务的JSON字符串
- 返回类型: `Task`

### runFile(string path)
- 描述: 从文件中读取路径追踪任务并运行
- 参数:
  - `path` (`string`): 相对文件路径，只允许读取脚本目录下文件
- 返回类型: `Task`

### runFileFromUser(string path)
- 描述: 从文件中读取路径追踪任务并运行，0.37.3新增
- 参数:
  - `path` (`string`): 相对文件路径，**在 `\User\AutoPathing` 目录下获取文件**
- 返回类型: `Task`

## 键鼠脚本 keyMouseScript

```js
let filePath = `assets/file.json`;
await keyMouseScript.runFile(filePath);
```

### run(string json)
- 描述: 运行键鼠脚本任务
- 参数:
  - `json` (`string`): 键鼠脚本任务的JSON字符串
- 返回类型: `Task`

### runFile(string path)
- 描述: 从文件中读取键鼠脚本任务并运行
- 参数:
  - `path` (`string`): 文件路径，只允许读取脚本目录下文件
- 返回类型: `Task`
