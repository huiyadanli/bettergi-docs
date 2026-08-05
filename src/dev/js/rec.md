---
title: 图像识别与OCR
order: 41
---

# 图像识别与 OCR

本页只记录脚本引擎已暴露的 `captureGameRegion`、`RecognitionObject`、`ImageRegion`、`Region`、`Mat`、`Point2f` 和 `OpenCvSharp`。图像对象实现了 `IDisposable`，高频截图或裁剪时必须及时释放。

## 截图入口

### captureGameRegion()

捕获游戏区域并返回 `ImageRegion`。游戏分辨率高于 1080P 时图像会缩放至 1920x1080；不高于 1080P 时保持原尺寸。

```js
const image = captureGameRegion();
try {
  log.info(`截图大小: ${image.width} x ${image.height}`);
} finally {
  image.dispose();
}
```

## 识别配置 RecognitionObject

`RecognitionObject` 用于描述模板匹配、OCR 或颜色识别规则。脚本通常通过静态工厂方法创建，不需要直接构造。

### 属性

| 名称 | 类型 | 访问 | 说明 |
|---|---|---|---|
| `recognitionType` | `RecognitionTypes` | 读写 | 识别类型 |
| `regionOfInterest` | `Rect` | 读写 | 感兴趣区域；默认值表示全图 |
| `name` | `string` | 读写 | 规则名称 |
| `templateImageMat` | `Mat` | 读写 | 模板图像 |
| `templateImageGreyMat` | `Mat` | 读写 | 灰度模板缓存 |
| `threshold` | `double` | 读写 | 模板匹配阈值 |
| `use3Channels` | `bool` | 读写 | 是否使用三通道匹配 |
| `templateMatchMode` | `TemplateMatchModes` | 读写 | OpenCV 模板匹配模式 |
| `colorConversionCode` | `ColorConversionCodes` | 读写 | 颜色空间转换方式 |
| `lowerColor` | `Scalar` | 读写 | 颜色范围下界 |
| `upperColor` | `Scalar` | 读写 | 颜色范围上界 |
| `allContainMatchText` | `string[]` | 读写 | OCR 结果必须包含的全部文本 |
| `oneContainMatchText` | `string[]` | 读写 | OCR 结果至少包含其一的文本 |
| `regexMatchText` | `string` | 读写 | OCR 正则过滤表达式 |

### 工厂方法

| 方法 | 参数类型 | 说明 |
|---|---|---|
| `templateMatch(mat)` | `mat: Mat` | 使用整张图创建模板匹配规则 |
| `templateMatch(mat, useMask, maskColor?)` | `mat: Mat`、`useMask: bool`、`maskColor: Color` | 创建可选颜色遮罩的模板匹配规则 |
| `templateMatch(mat, x, y, width, height)` | `mat: Mat`；坐标和尺寸为 `double` | 创建限定识别区域的模板匹配规则 |
| `ocr(x, y, width, height)` | 坐标和尺寸为 `double` | 创建限定区域的 OCR 规则 |
| `ocr(rect)` | `rect: Rect` | 使用矩形创建 OCR 规则 |
| `ocrMatch(x, y, width, height, matchTexts)` | 坐标和尺寸为 `double`；`matchTexts: string[]` | 创建限定区域并匹配指定文本的 OCR 规则 |

```js
const template = file.readImageMatSync("assets/paimon_menu.png");
const ro = RecognitionObject.templateMatch(template, 0, 0, 640, 216);
ro.threshold = 0.8;
```

### 模板匹配示例

下面通过派蒙菜单图标判断是否已经返回主界面。实际脚本需要返回主界面时，优先使用 `genshin.returnMainUi()`。

```js
const template = file.readImageMatSync("assets/paimon_menu.png");
const paimonMenuRo = RecognitionObject.templateMatch(template, 0, 0, 640, 216);

try {
  for (let i = 0; i < 5; i++) {
    const image = captureGameRegion();
    try {
      const result = image.find(paimonMenuRo);
      if (!result.isEmpty()) {
        log.info(
          "已到达主界面，主菜单位置({x},{y},{width},{height})，匹配得分 {score}",
          result.x, result.y, result.width, result.height, result.matchScore
        );
        break;
      }
      keyPress("ESCAPE");
    } finally {
      image.dispose();
    }
    await sleep(500);
  }
} finally {
  template.dispose();
}
```

### OCR 示例

`RecognitionObject.ocrThis` 表示对当前 `ImageRegion` 执行 OCR。`findMulti()` 返回 C# 集合，在 JS 中使用 `count` 和索引遍历。

```js
const image = captureGameRegion();
try {
  const results = image.findMulti(RecognitionObject.ocrThis);
  log.info("OCR 全区域识别结果数量 {count}", results.count);

  for (let i = 0; i < results.count; i++) {
    const result = results[i];
    log.info(
      "OCR 结果: 位置({x},{y},{width},{height}), 文本 {text}",
      result.x, result.y, result.width, result.height, result.text
    );
  }
} finally {
  image.dispose();
}
```

## 区域对象 Region

`Region` 是识别结果和区域操作的基础对象。坐标相对于游戏捕获区域。

### 属性

| 名称 | 类型 | 访问 | 说明 |
|---|---|---|---|
| `x`、`y` | `int` | 读写 | 左上角坐标 |
| `width`、`height` | `int` | 读写 | 区域尺寸 |
| `top`、`bottom`、`left`、`right` | `int` | 只读 | 区域边界 |
| `text` | `string` | 读写 | OCR 识别文本 |
| `matchScore` | `double?` | 读写 | 模板匹配得分；非模板匹配或未命中时为 `null` |

### 方法

| 方法 | 返回 | 说明 |
|---|---|---|
| `backgroundClick()` | `Region` | 后台点击区域中心 |
| `click()` | `Region` | 点击区域中心 |
| `clickTo(x, y)` | `Region` | 点击区域内相对坐标 |
| `move()` | `Region` | 移动鼠标到中心 |
| `moveTo(x, y)` | `Region` | 移动到区域内相对坐标 |
| `drawSelf(name, pen?)` | `Region` | 在遮罩中绘制区域 |
| `derive(x, y)` | `Region` | 派生偏移区域 |
| `isEmpty()` | `bool` | 是否为空结果 |
| `dispose()` | 无 | 释放持有的资源 |

### 区域与鼠标联动示例

识别返回的 `Region` 会自动把区域坐标转换为游戏窗口坐标，因此可以直接移动或点击。`clickTo(x, y)` 和 `moveTo(x, y)` 的参数是相对于识别区域左上角的偏移。

```js
const template = file.readImageMatSync("assets/confirm.png");
const confirmRo = RecognitionObject.templateMatch(template);
const image = captureGameRegion();

try {
  const confirm = image.find(confirmRo);
  if (!confirm.isEmpty()) {
    // 移动到识别区域中心，然后点击中心。
    confirm.move();
    await sleep(200);
    confirm.click();

    // 也可以操作区域内的相对坐标。
    // confirm.moveTo(10, 10);
    // confirm.clickTo(10, 10);
  }
} finally {
  image.dispose();
  template.dispose();
}
```

## 图像区域 ImageRegion

`ImageRegion` 继承 `Region`，额外持有图像数据并提供裁剪与识别能力。

### 属性

| 名称 | 类型 | 访问 | 说明 |
|---|---|---|---|
| `cacheImage` | `Image` | 只读 | ImageSharp 格式缓存；不推荐脚本直接使用 |
| `srcMat` | `Mat` | 只读 | 原始 OpenCV 图像 |
| `cacheGreyMat` | `Mat` | 只读 | 灰度图缓存 |

### 方法

下表使用 `Re...Object` 作为 `RecognitionObject` 的缩写。

| 方法 | 参数类型 | 说明 |
|---|---|---|
| `deriveCrop(x, y, width, height)` | `x: int`、`y: int`、`width: int`、`height: int` | 按像素裁剪子区域 |
| `deriveCrop(dx, dy, dw, dh)` | `dx: double`、`dy: double`、`dw: double`、`dh: double` | 将浮点像素值四舍五入后裁剪子区域 |
| `deriveCrop(rect)` | `rect: Rect` | 按矩形裁剪子区域 |
| `find(recognitionObject, successAction?, failAction?)` | `recognitionObject: Re...Object`；回调为 `Function` | 查找第一个结果，可传入成功和失败回调 |
| `findMulti(recognitionObject, successAction?, failAction?)` | `recognitionObject: Re...Object`；回调为 `Function` | 查找多个结果；模板匹配结果包含 `matchScore` |
| `dispose()` | 无 | 释放图像资源 |

```js
const image = captureGameRegion();
const template = file.readImageMatSync("assets/icon.png");
try {
  const ro = RecognitionObject.templateMatch(template);
  ro.threshold = 0.8;
  const matches = image.findMulti(ro);
  for (const region of matches) {
    log.info(`位置: ${region.x}, ${region.y}; 得分: ${region.matchScore}`);
  }
} finally {
  template.dispose();
  image.dispose();
}
```

## OpenCV 类型

### Mat

| 成员 | 类型或返回 | 说明 |
|---|---|---|
| `width`、`height` | `int` | 图像尺寸 |
| `channels()` | `int` | 通道数量 |
| `cvtColor(code)` | `Mat` | 转换颜色空间 |
| `threshold(thresh, maxValue, type)` | `Mat` | 阈值处理 |
| `dispose()` | 无 | 释放原生内存 |

### Point2f

`new Point2f(x, y)` 创建浮点坐标，公开 `x`、`y` 属性。

### OpenCvSharp

脚本引擎通过 `OpenCvSharp` 类型集合暴露命名空间。常用枚举包括 `ColorConversionCodes`、`ThresholdTypes` 和 `TemplateMatchModes`。

```js
const cvt = OpenCvSharp.OpenCvSharp.ColorConversionCodes;
const thresholdTypes = OpenCvSharp.OpenCvSharp.ThresholdTypes;

const image = captureGameRegion();
let gray;
let binary;
try {
  gray = image.srcMat.cvtColor(cvt.BGR2GRAY);
  binary = gray.threshold(127, 255, thresholdTypes.Binary);
} finally {
  binary?.dispose();
  gray?.dispose();
  image.dispose();
}
```

## 资源释放

- `ImageRegion`、`Mat` 和裁剪得到的新图像均应在 `finally` 中调用 `dispose()`。
- 不要在循环中长期保存截图、灰度图或模板匹配中间结果。
- `findMulti()` 返回的匹配结果可直接读取；其 `matchScore` 只对模板匹配有意义。
