---
title: 文件
order: 30
---

## 文件 file

### 文件读取

`BetterGI` 提供了安全的文件读写功能，支持同步和异步操作，可以读取文本文件、图像文件以及写入文件。

## 文件读取方法

### 1. 同步读取文本 - ReadTextSync

```javascript
const content = file.ReadTextSync(path);
```

**参数说明：**
- `path`: 文件路径（字符串）

**返回值：**
- 字符串，表示文件的内容

**示例：**
```javascript
// 同步读取文本文件
try {
  const content = file.ReadTextSync("test/example.txt");
  log.info(`文件内容: ${content}`);
} catch (error) {
  log.error(`读取文件失败: ${error}`);
}
```

### 2. 异步读取文本 - ReadText

```javascript
// Promise方式
const content = await file.ReadText(path);

// 回调方式
await file.ReadText(path, callback);
```

**参数说明：**
- `path`: 文件路径（字符串）
- `callback`: 回调函数，格式为 `function(error, content)`

**返回值：**
- Promise方式：返回Promise<string>，表示文件的内容
- 回调方式：通过回调函数返回内容

**示例：**

Promise方式：
```javascript
(async function() {
  try {
    const content = await file.ReadText("test/async-example.txt");
    log.info(`异步读取内容: ${content}`);
  } catch (error) {
    log.error(`异步读取失败: ${error}`);
  }
})();
```

回调方式：
```javascript
(async function() {
  await file.ReadText("test/callback-example.txt", (error, content) => {
    if (error) {
      log.error(`读取失败: ${error}`);
    } else {
      log.info(`读取内容: ${content}`);
    }
  });
})();
```

### 3. 同步读取图像 - ReadImageMatSync (0.44新增)

```javascript
const mat = file.ReadImageMatSync(path);
```

**参数说明：**
- `path`: 图像文件路径（字符串）

**返回值：**
- OpenCV的Mat对象，表示读取的图像

**示例：**
```javascript
try {
  const imageMat = file.ReadImageMatSync("images/example.png");
  log.info(`图像尺寸: ${imageMat.width}x${imageMat.height}`);
  // 进行图像处理...
} catch (error) {
  log.error(`读取图像失败: ${error}`);
}
```

## 完整示例

```javascript
(async function () {
  // 同步读取文本示例
  function syncReadTextExample() {
    try {
      const path = "test/example.txt";
      const content = file.ReadTextSync(path);
      log.info(`同步读取文本成功，内容: ${content}`);
    } catch (error) {
      log.error(`同步读取文本失败: ${error}`);
    }
  }
  
  // 异步读取文本示例 (Promise方式)
  async function asyncReadTextExample() {
    try {
      const path = "test/async-example.txt";
      const content = await file.ReadText(path);
      log.info(`异步读取文本成功，内容: ${content}`);
    } catch (error) {
      log.error(`异步读取文本失败: ${error}`);
    }
  }
  
  // 异步读取文本示例 (回调方式)
  async function callbackReadTextExample() {
    const path = "test/callback-example.txt";
    
    await file.ReadText(path, (error, content) => {
      if (error) {
        log.error(`回调读取文本失败: ${error}`);
      } else {
        log.info(`回调读取文本成功，内容: ${content}`);
      }
    });
  }
  
  // 同步读取图像示例
  function readImageExample() {
    try {
      const path = "images/example.png";
      const imageMat = file.ReadImageMatSync(path);
      log.info(`读取图像成功，尺寸: ${imageMat.width}x${imageMat.height}`);
      
      // 图像处理示例
      // const grayMat = imageMat.CvtColor(ColorConversionCodes.BGR2GRAY);
      // const threshold = grayMat.Threshold(127, 255, ThresholdTypes.Binary);
      
      // 使用完后释放资源
      // imageMat.Dispose();
      // grayMat.Dispose();
      // threshold.Dispose();
    } catch (error) {
      log.error(`读取图像失败: ${error}`);
    }
  }
  
  // 执行示例
  syncReadTextExample();
  await asyncReadTextExample();
  await callbackReadTextExample();
  readImageExample();
})();
```
## 文件写入方法 (0.44.3 新增)

### 1. 同步写入 - WriteTextSync

```javascript
const result = file.WriteTextSync(path, content, append);
```

**参数说明：**
- `path`: 文件路径（字符串）
- `content`: 要写入的内容（字符串）
- `append`: 是否追加模式（布尔值，默认为false表示覆盖写入）

**返回值：**
- 布尔值，表示写入是否成功

**示例：**
```javascript
// 覆盖写入
const result1 = file.WriteTextSync("test/example.txt", "这是覆盖写入的内容");

// 追加写入
const result2 = file.WriteTextSync("test/example.txt", "这是追加的内容", true);
```

### 2. 异步写入 - WriteText

```javascript
// Promise方式
const result = await file.WriteText(path, content, append);

// 回调方式
await file.WriteText(path, content, callback, append);
```

**参数说明：**
- `path`: 文件路径（字符串）
- `content`: 要写入的内容（字符串）
- `append`: 是否追加模式（布尔值，默认为false表示覆盖写入）
- `callback`: 回调函数，格式为 `function(error, result)`

**返回值：**
- Promise方式：返回Promise<boolean>，表示写入是否成功
- 回调方式：通过回调函数返回结果

**示例：**

Promise方式：
```javascript
(async function() {
  // 覆盖写入
  const result1 = await file.WriteText("test/async-example.txt", "异步写入的内容");
  if (result1) {
    log.info("异步写入成功");
  }
  
  // 追加写入
  const result2 = await file.WriteText("test/async-example.txt", "异步追加的内容", true);
  if (result2) {
    log.info("异步追加成功");
  }
})();
```

回调方式：
```javascript
(async function() {
  await file.WriteText("test/callback-example.txt", "使用回调的内容", (error, result) => {
    if (error) {
      log.error(`写入失败: ${error}`);
    } else {
      log.info("写入成功");
    }
  });
  
  // 追加模式
  await file.WriteText("test/callback-example.txt", "追加的内容", (error, result) => {
    if (error) {
      log.error(`追加失败: ${error}`);
    } else {
      log.info("追加成功");
    }
  }, true);
})();
```



## 完整示例

```javascript
(async function () {
  // 同步写入示例
  function syncWriteExample() {
    const content = "这是同步写入的测试内容";
    const path = "test/sync-example.txt";
    const result = file.WriteTextSync(path, content);
    
    if (result) {
      log.info("同步文件写入成功");
    } else {
      log.error("同步文件写入失败");
    }
    
    // 追加内容
    const appendResult = file.WriteTextSync(path, "\n这是追加的内容", true);
    if (appendResult) {
      log.info("同步追加内容成功");
    }
  }
  
  // 异步写入示例 (Promise方式)
  async function asyncWriteExample() {
    const content = "这是异步写入的测试内容";
    const path = "test/async-example.txt";
    
    try {
      const result = await file.WriteText(path, content);
      if (result) {
        log.info("异步文件写入成功");
        
        // 追加内容
        const appendResult = await file.WriteText(path, "\n这是异步追加的内容", true);
        if (appendResult) {
          log.info("异步追加内容成功");
        }
      }
    } catch (error) {
      log.error(`异步写入出错: ${error}`);
    }
  }
  
  // 异步写入示例 (回调方式)
  async function callbackWriteExample() {
    const content = "这是使用回调的测试内容";
    const path = "test/callback-example.txt";
    
    await file.WriteText(path, content, (error, result) => {
      if (error) {
        log.error(`回调写入失败: ${error}`);
      } else {
        log.info("回调写入成功");
      }
    });
  }
  
  // 执行示例
  syncWriteExample();
  await asyncWriteExample();
  await callbackWriteExample();
})();
```

## 文件读写组合示例

```javascript
(async function () {
  // 读取文件，修改内容后写回
  async function readModifyWriteExample() {
    const path = "test/data.txt";
    
    try {
      // 读取文件
      let content = await file.ReadText(path);
      log.info(`原始内容: ${content}`);
      
      // 修改内容
      content += "\n添加的新内容 - " + new Date().toLocaleString();
      
      // 写回文件
      const writeResult = await file.WriteText(path, content);
      if (writeResult) {
        log.info("修改并写回成功");
      } else {
        log.error("写回文件失败");
      }
    } catch (error) {
      log.error(`操作失败: ${error}`);
      
      // 如果文件不存在，创建新文件
      const newContent = "这是新创建的文件 - " + new Date().toLocaleString();
      const createResult = await file.WriteText(path, newContent);
      if (createResult) {
        log.info("创建新文件成功");
      }
    }
  }
  
  await readModifyWriteExample();
})();
```
## 注意事项

1. **路径安全**：所有路径都会被规范化和验证，确保不会访问到根目录以外的文件

2. **错误处理**：
   - 同步方法可能会抛出异常，建议使用try/catch捕获
   - 异步方法可以使用try/catch或回调函数处理错误

3. **图像读取**：
   - 图像读取使用OpenCV的Mat格式，适合进行图像处理
   - 默认以彩色模式(ImreadModes.Color)读取图像

4. **文件扩展名限制**：只允许写入以下扩展名的文件：
   - .txt, .json, .log, .csv, .xml, .html, .css

5. **文件大小限制**：写入内容不能超过999MB

6. **目录创建**：如果文件所在目录不存在，会自动创建
