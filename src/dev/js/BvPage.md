---
title: 页面操作(BvPage)
order: 81
author: DarkFlameMaster
date: 2026-02-24
---

# BvPage 类 API 文档

# 类概述

`BvPage` 基于 BvLocator 进行了更高层次的封装，提供了截图、等待、元素定位、OCR识别和鼠标点击等功能。

## 初始化方法

### 构造函数

<details>
<summary>查看C#实现</summary>

```csharp
public BvPage(CancellationToken cancellationToken = default)
{
    _cancellationToken = cancellationToken;
}
```

</details>

**JavaScript 调用示例**
- 直接通过构造函数创建实例
```javascript
// 直接创建 BvPage 实例
const page = new BvPage();

// 现在可以使用 page 进行页面操作
const regions = await page.GetByText("确认").FindAll();

```

**参数说明**

| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| cancellationToken | CancellationToken | 否 | 取消令牌，默认为 default |

**返回值**
- 返回 `BvPage` 实例


## 属性

| 属性 | 类型 | 描述 |
|------|------|------|
| Keyboard | IKeyboardSimulator | 键盘模拟器，用于键盘操作 |
| Mouse | IMouseSimulator | 鼠标模拟器，用于鼠标操作 |
| DefaultTimeout | int | 默认超时时间，单位为毫秒，默认值为 10000 |
| DefaultRetryInterval | int | 默认重试间隔，单位为毫秒，默认值为 1000 |


## 基础方法

### Screenshot

**参数说明**
- 无参数

**返回值**
- 类型：`ImageRegion`
- 返回当前屏幕的截图区域

**使用场景**
- 获取当前游戏界面截图
- 用于手动进行图像处理

**JavaScript 调用示例**

```javascript
// 截图
const screen = page.Screenshot();
// screen 是一个 ImageRegion 对象，可以进行进一步处理
log.info('截图成功');
```

<details>
<summary>查看C#实现</summary>

```csharp
public ImageRegion Screenshot()
{
    return TaskControl.CaptureToRectArea();
}
```

</details>

### Wait

**参数说明**
| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| milliseconds | int | 是 | 等待时间（毫秒） |

**返回值**
- 类型：`Task<BvPage>`
- 返回当前 `BvPage` 实例，支持链式调用

**使用场景**
- 等待一段时间后继续执行
- 用于需要延迟的场景

**JavaScript 调用示例**

```javascript
// 等待 1 秒
await page.Wait(1000);
log.info('等待完成');
```

<details>
<summary>查看C#实现</summary>

```csharp
public async Task<BvPage> Wait(int milliseconds)
{
    await TaskControl.Delay(milliseconds, _cancellationToken);
    return this;
}
```

</details>


## 定位方法

### Locator (RecognitionObject)

**参数说明**
| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| ro | RecognitionObject | 是 | 识别对象配置 |

**返回值**
- 类型：`BvLocator`
- 返回定位器实例，用于后续操作

**使用场景**
- 通过自定义 RecognitionObject 进行元素定位
- 适用于复杂的识别配置场景

**JavaScript 调用示例**

```javascript
// 创建 RecognitionObject
const ro = RecognitionObject.TemplateMatch(
    file.ReadImageMatSync("assets/paimon_menu.png")
);

// 通过 RecognitionObject 创建定位器
const locator = page.Locator(ro);
```

<details>
<summary>查看C#实现</summary>

```csharp
public BvLocator Locator(RecognitionObject ro)
{
    return new BvLocator(ro, _cancellationToken);
}
```

</details>

### GetByText

**参数说明**
| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| text | string | 否 | 要定位的文本，默认为空字符串 |
| rect | Rect | 否 | 感兴趣区域，默认为全屏 |

**返回值**
- 类型：`BvLocator`
- 返回定位器实例，用于后续操作

**使用场景**
- 通过文本进行元素定位的简写方式
- 与 `Locator(string text, Rect rect)` 等价

**JavaScript 调用示例**

```javascript
// 通过文本创建定位器（简写方式）
const locator = page.GetByText("确认");
const regions = await locator.FindAll();
```

<details>
<summary>查看C#实现</summary>

```csharp
public BvLocator GetByText(string text = "", Rect rect = default)
{
    return Locator(text, rect);
}
```
 - `GetByText`是`Locator(string text, Rect rect = default)`方法的语义化包装
```csharp
public BvLocator Locator(string text, Rect rect = default)
{
    return Locator(new RecognitionObject
    {
        RecognitionType = RecognitionTypes.Ocr,
        RegionOfInterest = rect,
        Text = text
    });
}
```



</details>

### GetByImage
**BvImage 类目前不太适合JS使用, 建议使用 `Locator(RecognitionObject ro)` 方法**

**参数说明**
| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| image | BvImage | 是 | 要定位的图像对象 |

**返回值**
- 类型：`BvLocator`
- 返回定位器实例，用于后续操作

**使用场景**
- 通过图像进行元素定位的简写方式
- 与 `Locator(BvImage image)` 等价


**JavaScript 调用示例**

```javascript
// 通过图像创建定位器（简写方式）
const locator = page.GetByImage(BvImage.FromName("confirm_button"));
const exists = await locator.IsExist();
```

<details>
<summary>查看C#实现</summary>

```csharp
public BvLocator GetByImage(BvImage image)
{
    return Locator(image);
}
```
 - `GetByImage`是`Locator(BvImage image)`方法的语义化包装

```csharp
public BvLocator Locator(BvImage image)
{
    return new BvLocator(image.ToRecognitionObject(), _cancellationToken);
}
```
</details>


## OCR 方法

### Ocr

**参数说明**
| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| rect | Rect | 否 | 感兴趣区域，默认为全屏 |

**返回值**
- 类型：`List<Region>`
- 返回识别到的所有文本区域列表

**使用场景**
- 对指定区域进行 OCR 识别
- 获取屏幕上所有文本内容

**JavaScript 调用示例**

```javascript
// 对整个屏幕进行 OCR 识别
const regions = page.Ocr();
log.info('识别到文本数:', regions.count);

// 对指定区域进行 OCR 识别
const regions2 = page.Ocr(new OpenCvSharp.OpenCvSharp.Rect(0, 0, 500, 500));
```

<details>
<summary>查看C#实现</summary>

```csharp
public List<Region> Ocr(Rect rect = default)
{
    return Locator(string.Empty, rect).FindAll();
}
```

</details>

## 交互方法

### Click

**参数说明**
| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| x | double | 是 | 1080P分辨率下的X坐标 |
| y | double | 是 | 1080P分辨率下的Y坐标 |

**返回值**
- 类型：`void`
- 无返回值

**使用场景**
- 点击指定坐标位置
- 用于点击没有识别元素的区域

**JavaScript 调用示例**

```javascript
// 点击坐标 (100, 200)
page.Click(100, 200);
log.info('点击完成');
```

<details>
<summary>查看C#实现</summary>

```csharp
public void Click(double x, double y)
{
    GameCaptureRegion.GameRegion1080PPosClick(x, y);
}
```

</details>


## 键盘鼠标操作

### Keyboard

**属性说明**
- 类型：`IKeyboardSimulator`
- 提供键盘模拟功能

**使用场景**
- 输入文本
- 按下/释放按键
- 组合键操作

**JavaScript 调用示例**

```javascript
// 输入文本
page.Keyboard.TextEntry("Hello World");

// 按下单个按键
page.Keyboard.KeyDown(65); // ASCII 码，A键
page.Keyboard.KeyUp(65);

// 组合键示例
page.Keyboard.ModifiedKeyStroke(17, 65); // Ctrl+A
```

### Mouse

**属性说明**
- 类型：`IMouseSimulator`
- 提供鼠标模拟功能

**使用场景**
- 鼠标移动
- 鼠标点击
- 鼠标拖拽

**JavaScript 调用示例**

```javascript
// 移动鼠标
page.Mouse.MoveMouseTo(100, 200);

// 左键点击
page.Mouse.LeftButtonClick();

// 左键双击
page.Mouse.LeftButtonDoubleClick();

// 右键点击
page.Mouse.RightButtonClick();

// 拖拽
page.Mouse.LeftButtonDown();
page.Mouse.MoveMouseBy(0, 100);
page.Mouse.LeftButtonUp();
```
