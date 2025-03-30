---
title: 文件
order: 30
---

## 文件 file

支持读取脚本目录下的任意文件

举例：
```js
// 传送
await file.readText('assets/1.json');
```

### readTextSync(string path)
- 描述: 同步读取文件中的所有文本
- 参数:
  - `path` (`string`): 文件路径
- 返回类型: `string`
- 返回: 从文件中读取的文本

### readText(string path)
- 描述: 异步读取文件中的所有文本
- 参数:
  - `path` (`string`): 文件路径
- 返回类型: `Task<string>`
- 返回: 从文件中读取的文本

### readText(string path, dynamic callbackFunc)
- 描述: 异步读取文件中的所有文本，并调用回调函数
- 参数:
  - `path` (`string`): 文件路径
  - `callbackFunc` (`dynamic`): 回调函数
- 返回类型: `Task<string>`
- 返回: 从文件中读取的文本

### readImageMatSync(string path)
- 描述: 同步读取图像文件为 OpenCV 的 Mat 格式。 0.44 版本新增
- 参数:
  - `path` (`string`): 文件路径
- 返回类型: `string`
- 返回: Mat 格式的图像文件