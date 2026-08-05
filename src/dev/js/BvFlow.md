---
title: 链式流程(BvFlow)
order: 82
---

# BvFlow 链式流程 API

`BvFlow` 通过已暴露的 `BvPage.flow()` 获取。动作和条件可以连续链式追加，最后调用 `run()` 执行。

```js
const page = new BvPage();
const achievementRect = new OpenCvSharp.OpenCvSharp.Rect(632, 441, 68, 28);

await page.flow()
  // 重复按 Esc，直到指定区域出现“成”或“就”。
  .keyPress("ESCAPE")
  .untilAnyText(["成", "就"], achievementRect)

  // click() 直接点击上一次识别到的位置，并重复点击直到出现“天地万象”。
  // click(x, y) 也可以点击指定位置。
  .click()
  .untilText("天地万象")

  // 点击刚识别到的“天地万象”。
  .click()

  // 等待出现“达成成就”，然后返回主界面。
  .waitUntilText("达成成就")
  .do(async () => {
    await genshin.returnMainUi();
  })
  .run();
```

识别结果会沿流程传递，因此无参 `click()`、`rightClick()`、`middleClick()` 和 `moveTo()` 都会使用最近一次匹配区域的中心点，无需再次填写坐标。`until...` 会重复执行它前面的动作直到条件满足，`waitUntil...` 则只等待条件。

## 流程设置

| 方法 | 参数类型 | 说明 |
|---|---|---|
| `withDefaultTimeout(milliseconds)` | `milliseconds: int` | 设置默认超时，单位毫秒 |
| `withDefaultRetryInterval(milliseconds)` | `milliseconds: int` | 设置默认识别重试间隔，单位毫秒 |
| `run()` | 无 | 执行流程 |

## 动作

### 使用最近匹配位置

以下无参鼠标动作使用最近一次识别结果的中心点。

| 方法 | 参数类型 | 说明 |
|---|---|---|
| `click()` | 无 | 左键点击 |
| `rightClick()` | 无 | 右键点击 |
| `middleClick()` | 无 | 中键点击 |
| `moveTo()` | 无 | 移动鼠标 |

### 使用指定坐标

| 方法 | 参数类型 | 说明 |
|---|---|---|
| `click(x, y)` | `x: double`、`y: double` | 左键点击游戏窗口坐标 |
| `rightClick(x, y)` | `x: double`、`y: double` | 右键点击游戏窗口坐标 |
| `middleClick(x, y)` | `x: double`、`y: double` | 中键点击游戏窗口坐标 |
| `moveTo(x, y)` | `x: double`、`y: double` | 移动鼠标到游戏窗口坐标 |
| `drag(fromX, fromY, toX, toY, duration = 300)` | 坐标均为 `double`；`duration: int` | 在指定起点与终点之间拖拽；时长单位毫秒 |
| `dragTo(toX, toY, duration = 300)` | 坐标均为 `double`；`duration: int` | 从最近匹配位置拖拽到指定坐标 |
| `dragFrom(fromX, fromY, duration = 300)` | 坐标均为 `double`；`duration: int` | 从指定坐标拖拽到最近匹配位置 |

### 其他动作

| 方法 | 参数类型 | 说明 |
|---|---|---|
| `do(callback)` | `callback: Function` | 执行同步或异步回调 |
| `keyPress(key)` | `key: string` | 按下一次指定按键，例如 `"ESCAPE"` |
| `wait(milliseconds)` | `milliseconds: int` | 等待指定毫秒数后继续流程 |

动作可追加 `withTimeout(milliseconds: int)`、`withRetryInterval(milliseconds: int)`，再继续连接其他动作或条件。

## 等待条件

| 方法 | 参数类型 | 说明 |
|---|---|---|
| `waitUntilText(text, rect?, timeout?, retryInterval?)` | `text: string`、`rect: Rect`、时间参数为 `int` 毫秒 | 等待文本出现 |
| `waitUntilAnyText(texts, rect?, timeout?, retryInterval?)` | `texts: string[]`、`rect: Rect`、时间参数为 `int` 毫秒 | 等待任一文本出现 |
| `waitUntil(locator, timeout?, retryInterval?)` | `locator: BvLocator`、时间参数为 `int` 毫秒 | 等待定位器出现 |
| `waitUntilAny(locators, timeout?, retryInterval?)` | `locators: BvLocator[]`、时间参数为 `int` 毫秒 | 等待任一定位器出现 |
| `waitUntilDisappear(locator, timeout?, retryInterval?)` | `locator: BvLocator`、时间参数为 `int` 毫秒 | 等待定位器消失 |
| `waitUntilAllDisappear(locators, timeout?, retryInterval?)` | `locators: BvLocator[]`、时间参数为 `int` 毫秒 | 等待全部定位器消失 |

### 重复动作直到条件满足

`until...` 必须接在一个动作之后，并重复该动作直到条件满足。

| 方法 | 参数类型 | 说明 |
|---|---|---|
| `untilText(text, rect?)` | `text: string`、`rect: Rect` | 直到文本出现 |
| `untilAnyText(texts, rect?)` | `texts: string[]`、`rect: Rect` | 直到任一文本出现 |
| `until(locator)` | `locator: BvLocator` | 直到定位器出现 |
| `untilAny(locators)` | `locators: BvLocator[]` | 直到任一定位器出现 |
| `untilDisappear(locator)` | `locator: BvLocator` | 直到定位器消失 |
| `untilAllDisappear(locators)` | `locators: BvLocator[]` | 直到全部定位器消失 |

`rect` 省略时使用全屏区域。可选参数可传 `null` 以使用默认值。超时或脚本取消会抛出异常。
