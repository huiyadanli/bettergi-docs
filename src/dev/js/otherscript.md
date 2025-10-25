---
title: 调用其他脚本
order: 50
---

## 地图追踪 pathingScript


### 基本用法

```js
// 从JSON字符串运行路径追踪
const pathingJson = '{"waypoints": [{"x": 100, "y": 200}, {"x": 300, "y": 400}]}';
await pathingScript.run(pathingJson);

// 从文件运行路径追踪
await pathingScript.runFile("assets/pathing.json");

// 从用户目录运行路径追踪
await pathingScript.runFileFromUser("my_pathing.json");
```

## 方法

### run(json)
- 描述: 运行地图追踪任务
- 参数:
  - `json` (`string`): 自动路径任务的JSON字符串
- 返回类型: `Task`
- 异常: 如果JSON格式错误或执行失败会抛出异常

### runFile(path)
- 描述: 从文件中读取地图追踪任务并运行
- 参数:
  - `path` (`string`): 相对文件路径，只允许读取脚本目录下文件
- 返回类型: `Task`
- 异常: 如果文件不存在或读取失败会抛出异常

### runFileFromUser(path)
- 描述: 从文件中读取地图追踪任务并运行，0.37.3新增
- 参数:
  - `path` (`string`): 相对文件路径，**在 `\User\AutoPathing` 目录下获取文件**
- 返回类型: `Task`
- 异常: 如果文件不存在或读取失败会抛出异常

## 键鼠脚本 keyMouseScript

BetterGI 提供了键鼠脚本功能，支持执行预录制的键鼠操作序列。

### 基本用法

```js
// 从文件运行键鼠脚本
let filePath = `assets/keymouse.json`;
await keyMouseScript.runFile(filePath);

// 从JSON字符串运行键鼠脚本
const keymouseJson = '{"actions": [{"type": "key", "key": "W", "duration": 1000}]}';
await keyMouseScript.run(keymouseJson);
```

## 方法

### run(json)
- 描述: 运行键鼠脚本任务
- 参数:
  - `json` (`string`): 键鼠脚本任务的JSON字符串
- 返回类型: `Task`
- 异常: 如果JSON格式错误或执行失败会抛出异常

### runFile(path)
- 描述: 从文件中读取键鼠脚本任务并运行
- 参数:
  - `path` (`string`): 文件路径，只允许读取脚本目录下文件
- 返回类型: `Task`
- 异常: 如果文件不存在或读取失败会抛出异常

## 完整示例

```js
(async function() {
  try {
    // 执行地图追踪任务
    log.info("开始执行地图追踪任务");
    await pathingScript.runFile("assets/collect_materials.json");
    log.info("地图追踪任务完成");
    
    // 执行键鼠脚本
    log.info("开始执行键鼠脚本");
    await keyMouseScript.runFile("assets/auto_click.json");
    log.info("键鼠脚本执行完成");
    
  } catch (error) {
    log.error(`脚本执行失败: ${error.message}`);
  }
})();
```

## 注意事项

1. **文件路径**：所有文件路径都相对于脚本根目录
2. **JSON格式**：确保JSON格式正确，否则会抛出异常
3. **权限控制**：只能访问脚本目录下的文件
4. **错误处理**：建议使用try-catch处理可能的异常
5. **任务取消**：支持通过取消令牌取消正在执行的任务
