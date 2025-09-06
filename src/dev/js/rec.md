---
title: 图像识别与OCR
order: 41
---

# 使用示例

## 截图

使用全局方法 `captureGameRegion()` 就可以获取 `ImageRegion` 图像。

再通过 `ImageRegion` 内自带的 `find`、`findMulti` 找图、OCR等操作

### captureGameRegion()
- 返回类型: `ImageRegion`
- 描述: 捕获游戏区域的图像

## 模板匹配

举例，模板匹配：
```js
// 定义识别对象
const paimonMenuRo = RecognitionObject.TemplateMatch(file.ReadImageMatSync("assets/paimon_menu.png"), 0, 0, genshin.width / 3.0, genshin.width / 5.0);

/**
 * 返回主界面，这里只做demo演示
 * 实际场景下，推荐使用已经包装好了的 `genshin.returnMainUi()`
 * @returns {Promise<void>}
 */
const returnMain = async () => {
  for (let i = 0; i < 5; i++) {
    // 最多 ESC 5次
    let captureRegion = captureGameRegion();  // 获取一张截图
    let res = captureRegion.Find(paimonMenuRo);
    if (res.isEmpty()) {
      keyPress("ESCAPE");
    } else {
      log.info("已到达主界面，主菜单位置({x},{y},{h},{w})", res.x, res.y, res.width, res.Height);
      break;
    }
    await sleep(500);
  }
}
```

举例，模板匹配并点击，区域和鼠标联动方法见下面文档：
```js
  // 打开背包
  keyPress("B");
  await sleep(1000);
  click(867,56);
  await sleep(1000);

  // 吃个日落果
  let apple = captureGameRegion().find(appleRo);
  if (apple.isExist()) {
      apple.click();
      await sleep(500);
      let confirm = captureGameRegion().find(confirmRo);
      if (confirm.isExist()) {
          confirm.click();
      }
  }
```

## OCR

举例：
```js
// 获取一张截图
let captureRegion = captureGameRegion();

// 对整个区域进行 OCR
let resList = captureRegion.findMulti(RecognitionObject.ocrThis);
log.info("OCR 全区域识别结果数量 {len}", resList.count);
for (let i = 0; i < resList.count; i++) { // 遍历的是 C# 的 List 对象，所以要用 count，而不是 length
  let res = resList[i];
  log.info("OCR结果:位置({x},{y},{h},{w}), 文本{text}", res.x, res.y, res.width, res.Height, res.text);
}
```

---

# 对象方法文档

所有属性和方法，在 js 内都可以通过小写开头的驼峰使用，更加符合js的代码规范。

# Region 类

区域基类，用于描述一个区域，可以是一个矩形，也可以是一个点（长宽为0）。

## 属性

### X
- 类型: `int`
- 描述: 区域的 X 坐标

### Y
- 类型: `int`
- 描述: 区域的 Y 坐标

### Width
- 类型: `int`
- 描述: 区域的宽度

### Height
- 类型: `int`
- 描述: 区域的高度

### Top
- 类型: `int`
- 描述: 区域顶部位置，等同于 Y 坐标

### Bottom
- 类型: `int`
- 描述: 区域底部位置，等于 Y + Height

### Left
- 类型: `int`
- 描述: 区域左侧位置，等同于 X 坐标

### Right
- 类型: `int`
- 描述: 区域右侧位置，等于 X + Width

### Text
- 类型: `string`
- 描述: 存放 OCR 识别的结果文本

## 构造函数

### Region()
- 描述: 创建一个空的区域对象

### Region(int x, int y, int width, int height, Region? owner, INodeConverter? converter, DrawContent? drawContent)
- 描述: 创建一个具有指定位置和大小的区域对象
- 参数:
  - `x` (`int`): X 坐标
  - `y` (`int`): Y 坐标
  - `width` (`int`): 宽度
  - `height` (`int`): 高度
  - `owner` (`Region?`): 所属区域
  - `converter` (`INodeConverter?`): 坐标转换器
  - `drawContent` (`DrawContent?`): 绘制内容

## 方法

### BackgroundClick()
- 描述: 鼠标后台点击当前区域的中心位置

### Click()
- 描述: 鼠标点击当前区域的中心位置

### ClickTo(int x, int y)
- 描述: 鼠标点击区域内指定位置
- 参数:
  - `x` (`int`): X 坐标
  - `y` (`int`): Y 坐标

### Move()
- 描述: 鼠标移动到当前区域的中心位置

### MoveTo(int x, int y)
- 描述: 鼠标移动到区域内指定位置
- 参数:
  - `x` (`int`): X 坐标
  - `y` (`int`): Y 坐标

### DrawSelf(string name, Pen? pen)
- 描述: 绘制自身区域到遮罩窗口上
- 参数:
  - `name` (`string`): 绘制名称
  - `pen` (`Pen?`): 绘制笔刷

### Derive(int x, int y)
- 描述: 派生一个点类型的新区域
- 参数:
  - `x` (`int`): X 坐标
  - `y` (`int`): Y 坐标
- 返回: 新的 `Region` 对象

### IsEmpty()
- 描述: 检查区域是否为空
- 返回: `bool` 类型，表示区域是否为空


# ImageRegion 类

继承自 `Region` 类，提供图像处理功能。

## 属性

### CacheImage
- 类型: `SixLabors.ImageSharp.Image`
- 描述: 获取 SixLabors.ImageSharp 格式的图像。如果需要会从 `Mat` 转换。不推荐使用，因为我也不知道怎么在JS使用它

### SrcMat
- 类型: `Mat`
- 描述: 获取源 OpenCV Mat 矩阵。如果需要会从 `Bitmap` 转换。

### CacheGreyMat
- 类型: `Mat`
- 描述: 获取源图像的灰度版本 Mat 矩阵。

## 构造函数

### ImageRegion(Mat mat, int x, int y, Region? owner, INodeConverter? converter, DrawContent? drawContent)
- 描述: 使用 Mat 矩阵创建新的图像区域
- 参数:
  - `mat` (`Mat`): OpenCV Mat 矩阵
  - `x` (`int`): X 坐标
  - `y` (`int`): Y 坐标
  - `owner` (`Region?`): 所属区域
  - `converter` (`INodeConverter?`): 节点转换器
  - `drawContent` (`DrawContent?`): 绘制内容

## 方法

### DeriveCrop(int x, int y, int w, int h)
- 描述: 创建当前区域的剪裁派生
- 参数:
  - `x` (`int`): X 坐标
  - `y` (`int`): Y 坐标
  - `w` (`int`): 宽度
  - `h` (`int`): 高度
- 返回: 包含剪裁区域的新 `ImageRegion`

### DeriveCrop(double dx, double dy, double dw, double dh)
- 描述: 使用双精度坐标创建剪裁派生
- 参数:
  - `dx` (`double`): X 坐标
  - `dy` (`double`): Y 坐标
  - `dw` (`double`): 宽度
  - `dh` (`double`): 高度
- 返回: 包含剪裁区域的新 `ImageRegion`

### Find(RecognitionObject ro)
- 描述: 在区域内查找识别对象
- 参数:
  - `ro` (`RecognitionObject`): 识别对象参数（OCR、模板匹配等），具体看下方对应对象文档
- 返回: 表示找到区域的 `Region`
- 支持:
  - 模板匹配 `RecognitionTypes.TemplateMatch`
  - OCR 匹配 `RecognitionTypes.OcrMatch` （不推荐使用此功能）
  - OCR 识别 `RecognitionTypes.Ocr`
  - 颜色范围和 OCR `RecognitionTypes.ColorMatch`

### FindMulti(RecognitionObject ro)
- 描述: 查找多个识别对象实例
- 参数:
  - `ro` (`RecognitionObject`): 识别对象参数（OCR、模板匹配等），具体看下方对应对象文档
- 返回: 找到的 `Region` 列表
- 支持:
  - 模板匹配（多个返回） `RecognitionTypes.TemplateMatch`
  - OCR 识别（多个返回） `RecognitionTypes.Ocr`

  
# RecognitionObject 类

用于描述识别对象的类，支持模板匹配、颜色匹配和 OCR 文字识别等功能。

## 通用属性

### RecognitionType
- 类型: `RecognitionTypes`
- 描述: 识别类型，包括：
  - `TemplateMatch`: 模板匹配
  - `ColorMatch`: 颜色匹配
  - `OcrMatch`: 文字识别并匹配
  - `Ocr`: 仅文字识别

### RegionOfInterest
- 类型: `Rect`
- 描述: 感兴趣的区域

### Name
- 类型: `string?`
- 描述: 识别对象名称，可以为空

### 模板匹配相关属性

#### TemplateImageMat
- 类型: `Mat?`
- 描述: 模板匹配的对象(彩色)

#### TemplateImageGreyMat
- 类型: `Mat?`
- 描述: 模板匹配的对象(灰色)

#### Threshold
- 类型: `double`
- 描述: 模板匹配阈值，默认 0.8

#### Use3Channels
- 类型: `bool`
- 描述: 是否使用 3 通道匹配，默认 false

#### TemplateMatchMode
- 类型: `TemplateMatchModes`
- 描述: 模板匹配算法，默认 CCoeffNormed

### 颜色匹配相关属性

#### ColorConversionCode
- 类型: `ColorConversionCodes`
- 描述: 颜色匹配方式，默认为 BGR2RGB

#### LowerColor
- 类型: `Scalar`
- 描述: 颜色范围下限

#### UpperColor
- 类型: `Scalar`
- 描述: 颜色范围上限

### OCR 相关属性

#### OcrEngine
- 类型: `OcrEngineTypes`
- 描述: OCR 引擎类型，目前仅支持 Paddle

#### AllContainMatchText
- 类型: `List<string>`
- 描述: 必须全部包含的匹配文本列表

#### OneContainMatchText
- 类型: `List<string>`
- 描述: 包含其中之一的匹配文本列表

#### RegexMatchText
- 类型: `List<string>`
- 描述: 正则表达式匹配文本列表

## 方法

### InitTemplate()
- 描述: 初始化模板匹配所需的灰度图和遮罩
- 返回: `RecognitionObject` 当前对象

### TemplateMatch(Mat mat)
- 描述: 创建模板匹配识别对象（推荐使用）
- 参数:
  - `mat` (`Mat`): 模板图像
- 返回: 新的模板匹配 `RecognitionObject` 对象

### TemplateMatch(Mat mat, double x, double y, double w, double h)
- 描述: 创建带区域的模板匹配识别对象（推荐使用）
- 参数:
  - `mat` (`Mat`): 模板图像
  - `x` (`double`): X 坐标
  - `y` (`double`): Y 坐标
  - `w` (`double`): 宽度
  - `h` (`double`): 高度
- 返回: 新的带区域的模板匹配 `RecognitionObject` 对象

### Ocr(double x, double y, double w, double h)
- 描述: 创建 OCR 识别对象（推荐使用）
- 参数:
  - `x` (`double`): X 坐标
  - `y` (`double`): Y 坐标
  - `w` (`double`): 宽度
  - `h` (`double`): 高度
- 返回: 新的OCR区域的 `RecognitionObject` 对象
