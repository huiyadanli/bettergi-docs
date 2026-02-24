---
title: 元素定位(BvLocator)
order: 80
author: DarkFlameMaster
date: 2026-02-24
---

# BvLocator 类 API 文档

# 类概述

`BvLocator` 主要用于元素定位，基于 Region 体系进行包装，提供了的元素定位、等待和交互方法。该类支持模板匹配和 OCR 两种识别方式，可用于游戏界面元素的自动识别和操作。

## 初始化方法

### 构造函数

<details>
<summary>查看C#实现</summary>

```csharp
public BvLocator(RecognitionObject recognitionObject, CancellationToken cancellationToken)
{
    RecognitionObject = recognitionObject.Clone();
    _cancellationToken = cancellationToken;
}
```

</details>

**JavaScript 调用示例**
- 也可以使用BvPage创建实例
```javascript
const token = new CancellationTokenSource().Token;
const ro = RecognitionObject.TemplateMatch(
    file.ReadImageMatSync("assets/paimon_menu.png")
);

// 创建 BvLocator 实例
const locator = new BvLocator(ro, token);

// 现在可以使用 locator 进行元素定位和操作
const exists = await locator.IsExist();
```

**参数说明**

| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| recognitionObject | RecognitionObject | 是 | 识别对象，包含识别类型、模板图像或文本等信息 |
| cancellationToken | CancellationToken | 是 | 取消令牌，用于取消长时间运行的操作 |

**返回值**
- 返回 `BvLocator` 实例


## 属性

| 属性 | 类型 | 描述 |
|------|------|------|
| RecognitionObject | RecognitionObject | 获取识别对象，包含识别配置信息 |
| RetryAction | `Action<List<Region>>?` | 重试时执行的操作，可为 null |
| DefaultTimeout | int | 默认超时时间，单位为毫秒，默认值为 10000 |
| DefaultRetryInterval | int | 默认重试间隔，单位为毫秒，默认值为 250 |


## 基础方法

### FindAll

**参数说明**
- 无参数

**返回值**
- 类型：`List<Region>`
- 可能取值：
  - 空列表：未找到元素
  - 包含一个或多个 `Region` 对象的列表：找到的元素

**使用场景**
- 直接查找屏幕上的元素，不进行等待
- 作为其他方法的基础，被内部调用
- 不建议外部直接调用，应使用更高层次的方法

**JavaScript 调用示例**

```javascript
const regions = await bvLocator.FindAll();
if (regions.count > 0) {
    log.info('找到元素:{0}个', regions.count);
} else {
    log.info('未找到元素');
}
```

<details>
<summary>查看C#实现</summary>

```csharp
public List<Region> FindAll()
{
    using var screen = CaptureToRectArea();

    if (RecognitionObject.RecognitionType == RecognitionTypes.TemplateMatch)
    {
        var region = screen.Find(RecognitionObject);
        if (region.IsExist())
        {
            return [region];
        }

        return [];
    }
    else if (RecognitionObject.RecognitionType == RecognitionTypes.Ocr)
    {
        var results = screen.FindMulti(RecognitionObject);
        if (!string.IsNullOrEmpty(RecognitionObject.Text))
        {
            return results.FindAll(r => r.Text.Contains(RecognitionObject.Text));
        }

        return results;
    }
    else
    {
        throw new NotSupportedException($"不被 Locator 支持的识别类型: {RecognitionObject.RecognitionType}");
    }
}
```

</details>

### IsExist

**参数说明**
- 无参数

**返回值**
- 类型：`bool`
- 可能取值：
  - `true`：元素存在
  - `false`：元素不存在

**使用场景**
- 快速检查元素是否存在，不需要获取具体位置信息

**JavaScript 调用示例**

```javascript
// 检查元素是否存在
const exists = await bvLocator.IsExist();
if (exists) {
    log.info('元素存在');
} else {
    log.info('元素不存在');
}
```

<details>
<summary>查看C#实现</summary>

```csharp
public bool IsExist()
{
    return FindAll().Count > 0;
}
```

</details>

## 等待方法

### WaitFor

**参数说明**
| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| timeout | int | 否 | 超时时间（毫秒），默认使用 `DefaultTimeout` (10000ms) |

**返回值**
- 类型：`Task<List<Region>>`
- 可能取值：
  - 包含一个或多个 `Region` 对象的列表：找到的元素
  - 抛出 `TimeoutException`：超时未找到元素

**使用场景**
- 需要等待界面元素加载完成后再进行操作

**JavaScript 调用示例**

```javascript
// 等待元素出现，最多等待5秒
try {
    const regions = await bvLocator.WaitFor(5000);
    log.info('元素已出现:{0}个', regions.count);
} catch (error) {
    log.error('等待超时:{0}', error.message);
}
```

<details>
<summary>查看C#实现</summary>

```csharp
public async Task<List<Region>> WaitFor(int? timeout = null)
{
    var actualTimeout = timeout ?? DefaultTimeout;
    var retryCount = actualTimeout / DefaultRetryInterval;

    List<Region> results = [];
    var retryRes = await NewRetry.WaitForAction(() =>
    {
        results = FindAll();
        var b = results.Count > 0;
        RetryAction?.Invoke(results);
        return b;
    }, _cancellationToken, retryCount, DefaultRetryInterval);

    if (retryRes)
    {
        return results;
    }
    else
    {
        throw BuildTimeoutException(actualTimeout);
    }
}
```

</details>

### TryWaitFor

**参数说明**
| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| timeout | int? | 否 | 超时时间（毫秒），默认使用 `DefaultTimeout` (10000ms) |

**返回值**
- 类型：`Task<List<Region>>`
- 可能取值：
  - 包含一个或多个 `Region` 对象的列表：找到的元素
  - 空列表：超时未找到元素

**使用场景**
- 不需要严格等待元素出现的场景
- 希望在元素未出现时继续执行后续操作

**JavaScript 调用示例**

```javascript
// 尝试等待元素出现，最多等待3秒
const regions = await bvLocator.TryWaitFor(3000);
if (regions.count > 0) {
    log.info('元素已出现:{0}个', regions.count);
} else {
    log.info('元素未出现，但没有抛出异常');
}
```

<details>
<summary>查看C#实现</summary>

```csharp
public async Task<List<Region>> TryWaitFor(int? timeout = null)
{
    try
    {
        return await WaitFor(timeout);
    }
    catch
    {
        return [];
    }
}
```

</details>

### WaitForDisappear

**参数说明**
| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| timeout | int? | 否 | 超时时间（毫秒），默认使用 `DefaultTimeout` (10000ms) |

**返回值**
- 类型：`Task`
- 可能取值：
  - 无返回值：元素成功消失
  - 抛出 `TimeoutException`：超时元素仍未消失

**使用场景**
- 需要等待界面元素消失后再进行操作
- 适用于异步操作场景

**JavaScript 调用示例**

```javascript
// 等待元素消失，最多等待5秒
try {
    await bvLocator.WaitForDisappear(5000);
    log.info('元素已消失');
} catch (error) {
    log.error('等待超时:{0}', error.message);
}
```

<details>
<summary>查看C#实现</summary>

```csharp
public async Task WaitForDisappear(int? timeout = null)
{
    var actualTimeout = timeout ?? DefaultTimeout;
    var retryCount = actualTimeout / DefaultRetryInterval;

    var retryRes = await NewRetry.WaitForAction(() =>
    {
        var results = FindAll();
        var b = results.Count == 0;
        if (!b)
        {
            RetryAction?.Invoke(results);
        }

        return b;
    }, _cancellationToken, retryCount, DefaultRetryInterval);

    if (!retryRes)
    {
        throw new TimeoutException($"识别元素在 {actualTimeout}ms 后超时未消失！");
    }
}
```

</details>

### TryWaitForDisappear

**参数说明**
| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| timeout | int? | 否 | 超时时间（毫秒），默认使用 `DefaultTimeout` (10000ms) |

**返回值**
- 类型：`Task`
- 无返回值，无论元素是否消失都会完成

**使用场景**
- 不需要严格等待元素消失的场景
- 希望在元素未消失时继续执行后续操作

**JavaScript 调用示例**

```javascript
// 尝试等待元素消失，最多等待3秒
await bvLocator.TryWaitForDisappear(3000);
log.info('尝试等待元素消失完成');
```

<details>
<summary>查看C#实现</summary>

```csharp
public async Task TryWaitForDisappear(int? timeout = null)
{
    try
    {
        await WaitForDisappear(timeout);
    }
    catch
    {
        // ignored
    }
}
```

</details>

## 交互方法

### Click

**参数说明**
| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| timeout | int? | 否 | 超时时间（毫秒），默认使用 `DefaultTimeout` (10000ms) |

**返回值**
- 类型：`Task<Region>`
- 可能取值：
  - `Region` 对象：点击的元素
  - 抛出 `TimeoutException`：超时未找到元素

**使用场景**
- 需要点击界面上的按钮、链接等元素
- 适用于需要精确定位后点击的场景

**JavaScript 调用示例**

```javascript
// 等待元素出现并点击，最多等待5秒
try {
    const region = await bvLocator.Click(5000);
    log.info('点击成功:{0}', region);
} catch (error) {
    log.error('操作失败:{0}', error.message);
}
```

<details>
<summary>查看C#实现</summary>

```csharp
public async Task<Region> Click(int? timeout = null)
{
    return (await WaitFor(timeout)).First().Click();
}
```

</details>

### ClickUntilDisappears

**参数说明**
| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| timeout | int? | 否 | 超时时间（毫秒），默认使用 `DefaultTimeout` (10000ms) |

**返回值**
- 类型：`Task<Region>`
- 可能取值：
  - `Region` 对象：点击的元素
  - 抛出 `TimeoutException`：超时未找到元素或元素未消失

**使用场景**
- 需要点击元素并确认操作生效（元素消失）的场景
- 适用于需要确认操作结果的场景

**JavaScript 调用示例**

```javascript
// 等待元素出现并点击，直到元素消失
try {
    const region = await bvLocator.ClickUntilDisappears(10000);
    log.info('点击成功并确认元素消失:{0}', region);
} catch (error) {
    log.error('操作失败:{0}', error.message);
}
```

<details>
<summary>查看C#实现</summary>

```csharp
public async Task<Region> ClickUntilDisappears(int? timeout = null)
{
    var region = (await WaitFor(timeout)).First().Click();
    await new BvLocator(RecognitionObject, _cancellationToken)
        .WithRetryAction(resList => { resList.First().Click(); }).WaitForDisappear();
    return region;
}
```

</details>

### DoubleClick

**参数说明**
| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| timeout | int? | 否 | 超时时间（毫秒），默认使用 `DefaultTimeout` (10000ms) |

**返回值**
- 类型：`Task<Region>`
- 可能取值：
  - `Region` 对象：双击的元素
  - 抛出 `TimeoutException`：超时未找到元素

**使用场景**
- 需要双击界面上的元素，如打开文件、进入编辑模式等
- 适用于需要双击操作的场景

**JavaScript 调用示例**

```javascript
// 等待元素出现并双击，最多等待5秒
try {
    const region = await bvLocator.DoubleClick(5000);
    log.info('双击成功:{0}', region);
} catch (error) {
    log.error('操作失败:{0}', error.message);
}
```

<details>
<summary>查看C#实现</summary>

```csharp
public async Task<Region> DoubleClick(int? timeout = null)
{
    var list = await WaitFor(timeout);
    return list.First().DoubleClick();
}
```

</details>

## 配置方法

### WithRoi

**参数说明**
| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| rect | Rect | 是 | 感兴趣区域的矩形范围 |

**返回值**
- 类型：`BvLocator`
- 返回当前 `BvLocator` 实例，支持链式调用

**使用场景**
- 已知元素大致位置，需要缩小搜索范围
- 提高识别速度和准确性

**JavaScript 调用示例**

```javascript
// 设置感兴趣区域 (ROI)
const rect  = new OpenCvSharp.OpenCvSharp.Rect(0,0,1920,1080);
const updatedLocator = bvLocator.WithRoi(rect);
// 现在可以使用 updatedLocator 进行定位
const regions = await updatedLocator.FindAll();
```

<details>
<summary>查看C#实现</summary>

```csharp
public BvLocator WithRoi(Rect rect)
{
    RecognitionObject.RegionOfInterest = rect;
    return this;
}
```

</details>

### WithRoi (函数版本)

**参数说明**
| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| deltaFunc | Func<Rect, Rect> | 是 | 基于基础矩形计算 ROI 的函数 |

**返回值**
- 类型：`BvLocator`
- 返回当前 `BvLocator` 实例，支持链式调用

**使用场景**
- 需要动态计算 ROI

**JavaScript 调用示例**

```javascript
// 使用函数设置感兴趣区域
const updatedLocator = bvLocator.WithRoi(baseRect => {
    // 仅作为演示，四边向内缩10像素
    baseRect.Inflate(-10, -10);
    return  baseRect
});
// 现在可以使用 updatedLocator 进行定位
const regions = await updatedLocator.FindAll();
```

<details>
<summary>查看C#实现</summary>

```csharp
public BvLocator WithRoi(Func<Rect, Rect> deltaFunc)
{
    var captureAreaRect = TaskContext.Instance().SystemInfo.ScaleMax1080PCaptureRect;
    var rect = deltaFunc(captureAreaRect);
    RecognitionObject.RegionOfInterest = rect;
    return this;
}
```

</details>

### WithRetryAction

**参数说明**
| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| action | `Action<List<Region>>?` | 否 | 重试时执行的操作，可为 null |

**返回值**
- 类型：`BvLocator`
- 返回当前 `BvLocator` 实例，支持链式调用

**使用场景**
- 需要在重试过程中执行额外操作，如滚动屏幕、刷新界面等
- 提高元素定位的成功率

**JavaScript 调用示例**

```javascript
// 设置重试操作
const updatedLocator = bvLocator.WithRetryAction(regions => {
    log.info('重试中，当前找到元素数:{0}', regions.count);
    // 可以在这里执行额外的操作，如滚动屏幕等
});
// 现在使用 updatedLocator 进行等待
const regions = await updatedLocator.WaitFor(5000);
```

<details>
<summary>查看C#实现</summary>

```csharp
public BvLocator WithRetryAction(Action<List<Region>>? action)
{
    RetryAction = action;
    return this;
}
```

</details>