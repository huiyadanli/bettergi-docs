---
title: 页面操作(BvPage)
order: 81
author: DarkFlameMaster
date: 2026-02-24
---

# BvPage 类 API 文档


## 初始化方法



**参数说明**

| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| cancellationToken | CancellationToken | 否 | 取消令牌，默认为 default |

**返回值**
- 返回 `BvPage` 实例

**JavaScript 调用示例**

```javascript
// 直接创建 BvPage 实例（使用默认取消令牌）
const page = new BvPage();

// 后续操作
const regions = await page.getByText("确认").findAll();
```

<details>
<summary>查看C#实现</summary>

```csharp
public BvPage(CancellationToken cancellationToken = default)
{
    _cancellationToken = cancellationToken;
}
```

</details>

## 基础方法

### Screenshot - 截屏

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
// 获取截图
const screen = page.screenshot();

// 可以在截图上进行识别操作，一般不这么用
const ro = RecognitionObject.TemplateMatch(
    file.ReadImageMatSync("assets/button.png")
);
const region = screen.Find(ro);

if (region.IsExist()) {
    log.info('在截图中找到元素');
    region.click();
}

log.info('截图完成');
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

### Wait - 等待

**参数说明**
| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| milliseconds | int | 是 | 等待时间（毫秒） |

**返回值**
- 类型：`Task<BvPage>`
- 返回当前 `BvPage` 实例，支持链式调用

**使用场景**
- 等待一段时间后继续执行
- 用于需要延迟的场景，如等待界面加载

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


## 初始化 BvLocator 方法

### Locator - 识别对象版

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

// 使用定位器进行操作
const regions = await locator.waitFor(5000);
if (regions.Count > 0) {
    log.info('找到元素');
    regions.first().click();
}
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

### Locator - OCR 版
 - 与 `GetByText(string text, Rect rect)` 等价

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
// 通过文本创建定位器
const locator = page.getByText("确认");

// 查找并点击
const regions = await locator.waitFor(5000);
if (regions.Count > 0) {
    log.info('找到文字:确认');
    regions.first().click();
}

// 链式调用:一行代码完成查找和点击
await page.getByText("确认").click(5000);

// 指定区域查找
const rect = new OpenCvSharp.OpenCvSharp.Rect(0, 800, 1920, 280);
const bottomTexts = page.getByText("开始", rect);
const bottomRegions = await bottomTexts.tryWaitFor(3000);
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


## 其他

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
const regions = page.ocr();
log.info('识别到文本数:{0}', regions.Count);

// 遍历识别结果
for (let i = 0; i < regions.Count; i++) {
    const region = regions[i];
    log.info('文本:{0}, 位置：({1}, {2})', region.Text, region.X, region.Y);
}

// 对指定区域进行 OCR 识别
const rect = new OpenCvSharp.OpenCvSharp.Rect(0, 0, 500, 500);
const topLeftRegions = page.ocr(rect);
log.info('左上角识别到文本数:{0}', topLeftRegions.Count);
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


### Click

**参数说明**
| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| x | double | 是 | 1080P 分辨率下的 X 坐标 |
| y | double | 是 | 1080P 分辨率下的 Y 坐标 |

**返回值**
- 类型：`void`
- 无返回值

**使用场景**
- 点击指定坐标位置
- 用于点击没有识别元素的区域

**JavaScript 调用示例**

```javascript
// 点击坐标 (100, 200)
page.click(100, 200);
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
