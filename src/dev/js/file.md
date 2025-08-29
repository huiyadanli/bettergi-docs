---
title: 文件
order: 30
---

## 文件 file

### 文件读取

`BetterGI` 提供了安全的文件读写功能，支持同步和异步操作，可以读取文本文件、图像文件以及写入文件。

## 文件读取方法

### 1. 同步读取文本 - readTextSync

```javascript
const content = file.readTextSync(path);
```

**参数说明：**
- `path`: 文件路径（字符串）

**返回值：**
- 字符串，表示文件的内容

**示例：**
```javascript
// 同步读取文本文件
try {
  const content = file.readTextSync("test/example.txt");
  log.info(`文件内容: ${content}`);
} catch (error) {
  log.error(`读取文件失败: ${error}`);
}
```

### 2. 异步读取文本 - readText

```javascript
// Promise方式
const content = await file.readText(path);

// 回调方式
await file.readText(path, callback);
```

**参数说明：**
- `path`: 文件路径（字符串）
- `callback`: 回调函数，格式为 `function(error, content)`

**返回值：**
- Promise方式：返回 `Promise<string>`，表示文件的内容
- 回调方式：通过回调函数返回内容

**示例：**

Promise方式：
```javascript
(async function() {
  try {
    const content = await file.readText("test/async-example.txt");
    log.info(`异步读取内容: ${content}`);
  } catch (error) {
    log.error(`异步读取失败: ${error}`);
  }
})();
```

回调方式：
```javascript
(async function() {
  await file.readText("test/callback-example.txt", (error, content) => {
    if (error) {
      log.error(`读取失败: ${error}`);
    } else {
      log.info(`读取内容: ${content}`);
    }
  });
})();
```

### 3. 同步读取图像 - readImageMatSync (0.44新增)

```javascript
const mat = file.readImageMatSync(path);
```

**参数说明：**
- `path`: 图像文件路径（字符串）

**返回值：**
- OpenCV的Mat对象，表示读取的图像

**示例：**
```javascript
try {
  const imageMat = file.readImageMatSync("images/example.png");
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
      const content = file.readTextSync(path);
      log.info(`同步读取文本成功，内容: ${content}`);
    } catch (error) {
      log.error(`同步读取文本失败: ${error}`);
    }
  }
  
  // 异步读取文本示例 (Promise方式)
  async function asyncReadTextExample() {
    try {
      const path = "test/async-example.txt";
      const content = await file.readText(path);
      log.info(`异步读取文本成功，内容: ${content}`);
    } catch (error) {
      log.error(`异步读取文本失败: ${error}`);
    }
  }
  
  // 异步读取文本示例 (回调方式)
  async function callbackReadTextExample() {
    const path = "test/callback-example.txt";
    
    await file.readText(path, (error, content) => {
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
      const imageMat = file.readImageMatSync(path);
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

### 1. 同步写入文本 - writeTextSync

```javascript
const result = file.writeTextSync(path, content, append);
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
const result1 = file.writeTextSync("test/example.txt", "这是覆盖写入的内容");

// 追加写入
const result2 = file.writeTextSync("test/example.txt", "这是追加的内容", true);
```

### 2. 异步写入文本 - writeText

```javascript
// Promise方式
const result = await file.writeText(path, content, append);

// 回调方式
await file.writeText(path, content, callback, append);
```

**参数说明：**
- `path`: 文件路径（字符串）
- `content`: 要写入的内容（字符串）
- `append`: 是否追加模式（布尔值，默认为false表示覆盖写入）
- `callback`: 回调函数，格式为 `function(error, result)`

**返回值：**
- Promise方式：返回 `Promise<boolean>`，表示写入是否成功
- 回调方式：通过回调函数返回结果

**示例：**

Promise方式：
```javascript
(async function() {
  // 覆盖写入
  const result1 = await file.writeText("test/async-example.txt", "异步写入的内容");
  if (result1) {
    log.info("异步写入成功");
  }
  
  // 追加写入
  const result2 = await file.writeText("test/async-example.txt", "异步追加的内容", true);
  if (result2) {
    log.info("异步追加成功");
  }
})();
```

回调方式：
```javascript
(async function() {
  await file.writeText("test/callback-example.txt", "使用回调的内容", (error, result) => {
    if (error) {
      log.error(`写入失败: ${error}`);
    } else {
      log.info("写入成功");
    }
  });
  
  // 追加模式
  await file.writeText("test/callback-example.txt", "追加的内容", (error, result) => {
    if (error) {
      log.error(`追加失败: ${error}`);
    } else {
      log.info("追加成功");
    }
  }, true);
})();
```

### 3. 同步保存图片 - writeImageSync (0.48.2 新增) 

```javascript
const result = file.writeImageSync(path, mat);
```

**参数说明：**
- `path`: 文件路径（字符串，可不带扩展名；不带时将自动追加 `.png`）
- `mat`: 要保存的图片（OpenCV Mat 矩阵）

**返回值：**
- 布尔值，表示保存是否成功

**示例：**

无扩展名时自动以 PNG 保存：
```javascript
// 文件路径重复则覆盖原图
const ra = captureGameRegion();
const mat = ra.DeriveCrop(100, 200, 300, 150).SrcMat;
const result = file.WriteImageSync("test/image.png", mat);
// const ok = file.WriteImageSync("test/image", mat); // 实际保存为 test/image.png
if (result) {
  log.info("保存图片成功");
}
```

指定为 JPG 保存：
```javascript
const result = file.WriteImageSync("test/photo.jpg", mat);
```

**说明：**
- 支持的图片扩展名：`.png`, `.jpg`, `.jpeg`, `.bmp`, `.tiff`, `.webp`
- 目标目录不存在时会自动创建
- 同名文件将被覆盖


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
    const appendResult = file.writeTextSync(path, "\n这是追加的内容", true);
    if (appendResult) {
      log.info("同步追加内容成功");
    }
  }
  
  // 异步写入示例 (Promise方式)
  async function asyncWriteExample() {
    const content = "这是异步写入的测试内容";
    const path = "test/async-example.txt";
    
    try {
      const result = await file.writeText(path, content);
      if (result) {
        log.info("异步文件写入成功");
        
        // 追加内容
        const appendResult = await file.writeText(path, "\n这是异步追加的内容", true);
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
    
    await file.writeText(path, content, (error, result) => {
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
## 文件目录相关方法 (0.45.1 新增)

### 1. 单级子目录读取 - readPathSync

```javascript
let allPaths = file.readPathSync(path);
```

**参数说明：**
- `path`: 要读取的文件夹路径（字符串）

**返回值：**
- 字符串数组（需要二次转换为JavaScript的标准数组）

**示例：**
```javascript
// 读取指定路径下所有文件和文件夹的路径（非递归）
let allPaths = file.readPathSync(path);

// 将返回值转换为标准数组
allPaths = Array.from(allPaths);

log.info(`当前目录下的内容: ${allPaths.join(" ")}`);
```

### 2. 判断路径是否为文件夹 - isFolder

```javascript
let isFolder = file.isFolder(path);
```

**参数说明：**
- `path`: 要判断的文件夹/文件夹路径（字符串）

**返回值：**
- 布尔值(boolean)
	**true** 表示传入的路径指向一个**文件夹**
	**false** 表示传入的路径指向一个**文件**

**示例：**
```javascript
let p = "D:/转生成为雷电将军 然后天下无敌.txt"

const isFolder = file.isFolder(path);

log.info(`当前路径是否为文件夹: ${isFolder}`); // 本示例的file.isFlase的返回值为 false
```

## 文件读写组合示例

```javascript
(async function () {
  // 读取文件，修改内容后写回
  async function readModifyWriteExample() {
    const path = "test/data.txt";
    
    try {
      // 读取文件
      let content = await file.readText(path);
      log.info(`原始内容: ${content}`);
      
      // 修改内容
      content += "\n添加的新内容 - " + new Date().toLocaleString();
      
      // 写回文件
      const writeResult = await file.writeText(path, content);
      if (writeResult) {
        log.info("修改并写回成功");
      } else {
        log.error("写回文件失败");
      }
    } catch (error) {
      log.error(`操作失败: ${error}`);
      
      // 如果文件不存在，创建新文件
      const newContent = "这是新创建的文件 - " + new Date().toLocaleString();
      const createResult = await file.writeText(path, newContent);
      if (createResult) {
        log.info("创建新文件成功");
      }
    }
  }
  
  await readModifyWriteExample();
})();
```

## 文件读取与目录相关操作组合示例（实际应用）

以下示例中提及的 ```sha256To8()``` 方法 和 ```JSON文件``` 未在此处给出，本示例仅提供一种**文件读取**与**目录相关操作**结合的实际应用(本代码段可在JS脚本: AutoPathingLoader-MultiUser 的 main.js 中找到)

```javascript
(async function () {
  /**
     * 异步计算指定文件夹中所有 JSON 文件内容的 SHA-256 哈希值（返回8位数字字符串）(附带JS版号)。
     *
     * 该方法执行步骤如下：
     * 1. 调用 file.readPathSync() 读取指定文件夹下所有文件和文件夹的路径（非递归）。
     * 2. 使用 Array.from() 将返回值转换为标准数组。
     * 3. 过滤出所有非文件夹且文件名以 ".json" 结尾的路径。
     * 4. 将这些 JSON 文件内容读取后合并成一个总体字符串。
     * 5. 调用自定义的 sha256To8() 方法生成并返回 8 位数字的哈希值。
     * 6. 如果没有符合条件的 JSON 文件，返回 "00000000"。
     *
     * @param {string} path - 文件夹路径（相对于根目录）。
     * @returns {Promise<string>} 返回一个 Promise，其解析结果为8位数字格式的哈希值字符串。
     */
    async function getSha256FromPath(path) {
        // 读取指定路径下所有文件和文件夹的路径（非递归）
        let allPaths = file.readPathSync(path);

        // 将返回值转换为标准数组，以确保可以使用 filter 方法
        allPaths = Array.from(allPaths);

        // 过滤出所有非文件夹且以 ".json" 结尾的文件路径
        const jsonPaths = allPaths.filter(p => !file.isFolder(p) && p.endsWith(".json"));

        // 读取JS版号
        const version = JSON.parse(file.readTextSync("manifest.json"))["version"];
        
        // 如果有符合条件的文件，读取并合并文件内容后计算哈希
        if (jsonPaths.length > 0) {
            const combinedContent = jsonPaths
                .map(p => file.readTextSync(p))
                .join('');
            return sha256To8(version + combinedContent);
        } else {
            // 如果没有符合条件的文件，则返回 "00000000"
            return "00000000";
        }
    }
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
   - 文本/数据：`.txt`, `.json`, `.log`, `.csv`, `.xml`, `.html`, `.css`
   - 图片：`.png`, `.jpg`, `.jpeg`, `.bmp`, `.tiff`, `.webp`

5. **文件大小限制**：写入内容不能超过999MB

6. **目录创建**：如果文件所在目录不存在，会自动创建

7. **目录读取**：```file.readPathSync(path)``` 读取到的目录数组建议使用 ```Array.from()``` 处理后再使用

8. **图片保存**：
   - `WriteImageSync(path, mat)` 为同步方法，返回布尔值
   - `path` 不带扩展名时将自动追加 `.png`
   - 仅允许保存为：`.png`, `.jpg`, `.jpeg`, `.bmp`, `.tiff`, `.webp`
   - 目标目录不存在会自动创建；同名文件将被覆盖


