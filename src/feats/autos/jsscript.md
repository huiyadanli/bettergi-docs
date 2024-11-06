---
title: Javascript 脚本
order: 10
---

::: warning 注意

文档建设中

:::

BetterGI 内部有大量原神自动化基础能力的包装，并可以通过 Javascript 书写的脚本进行调用，JS脚本通过 [ClearScript](https://github.com/microsoft/ClearScript) 内置 V8 引擎进行执行。

期望最终能够做到自动启动原神并完成所有脚本任务后自动关机。

所有脚本存储在软件根目录 `User\JsScript` 路径下。脚本仓库：[bettergi-scripts-list](https://github.com/babalae/bettergi-scripts-list) ( repo/js 路径下)。脚本仓库在线版：[https://bgi.sh](https://bgi.sh)

## 常见问题

* **执行脚本时直接发生异常：Error：当前不在地图界面**
  * 请确保你打开地图的按键是M键
* **传送完成后角色站在原地不动？**
  * 请确保游戏左上角派蒙头像未被其他悬浮窗遮挡
* **运行键鼠脚本时候方向有较大偏差？**(自动采集晶蝶/自动狗粮的行走调用了键鼠脚本)
  * 请确保游戏以60帧运行
  * 请确保游戏视角灵敏度保持默认（默认值是3）
* **运行自动晶蝶脚本时传送过去晶蝶已经飞走了？**
  * 请确保队伍中带有早柚/瑶瑶
* **运行狗粮脚本时会差一点距离，或者走过头？**
  * 请确保运行时是琳妮特前台且拥有双风共鸣（元素共鸣需要四个角色组队触发，只带两个风系角色是没用的），且队伍中没有其他移速天赋加成的角色
* **晶蝶抓不齐/狗粮没调查到/调查了不捡？**
  * 自动晶蝶和自动狗粮在走到目的地时没有任何图像识别，无法保证百分百获取

## 附录

全地图传送点坐标合集，也是软件内置的所有传送点。

https://wwmy.lanzouq.com/b0fosbd9g 密码:coco

# 脚本编写

## 基本项目配置

每个JS脚本都是一个文件夹，文件夹内必须要有一个脚本描述文件 `manifest.json` 和一个入口程序文件 `*.js`。

脚本的配置可以通过一个 JSON 配置文件进行 UI 渲染，然后用户可以修改配置并执行脚本。

项目内所有文件编码必须是 `UTF-8` 。

### manifest.json

```json
{
  "manifest_version": 1,
  "name": "传送并自动秘境", // 名称
  "version": "1.0", // 版本
  "description": "BetterGI自带脚本，用于传送后并执行自动秘境", // 描述
  // 作者信息
  "authors": [
    {
      "name": "huiyadanli",
      "link": "https://github.com/huiyadanli"
    }
  ],
  // 自定义配置
  "settings_ui": "settings.json",
  // 入口文件
  "main": "main.js"
}
```

### main.js

```js
(async function () {
    // 所有的代码必须由 async function 包裹
})();
```

### settings.json

用于在 BetterGI 的调度器中配置变量

```js
[
  {
    "name": "selectValue", // 变量名，在js内使用 settings.变量名 获取对应的配置值
    "type": "select", // 类型
    "label": "选项框", // 显示标签
    "options": [ //选项
      "选项一",
      "选项二"
    ]
  },
  {
    "name": "inputValue",
    "type": "input-text",
    "label": "文本框"
  },
  {
    "name": "checkValue",
    "type": "checkbox",
    "label": "复选框"
  }
]
```




## 全局方法

举例：
```js
// 向前走2s
keyDown("w");
await sleep(2000);
keyUp("w");
```

### sleep(int millisecondsTimeout)
- 返回类型: `Task`
- 描述: 使当前任务休眠指定的毫秒数
- 参数:
  - `millisecondsTimeout` (`int`): 休眠时间，单位为毫秒

### keyDown(string key)
- 描述: 按下指定的键
- 参数:
  - `key` (`string`): 要按下的键，具体可用参数见 [虚拟键代码表](/feats/append/keycodes.html)

### keyUp(string key)
- 描述: 释放指定的键
- 参数:
  - `key` (`string`): 要释放的键，具体可用参数见 [虚拟键代码表](/feats/append/keycodes.html)

### keyPress(string key)
- 描述: 按下并释放指定的键
- 参数:
  - `key` (`string`): 要按下并释放的键，具体可用参数见 [虚拟键代码表](/feats/append/keycodes.html)

### setGameMetrics(int width, int height, double dpi = 1)
- 描述: 设置你编写脚本环境的游戏分辨率和DPI缩放，在其他电脑上运行时，程序会自动适配。**游戏分辨率影响鼠标的绝对位置，也就是 `moveMouseTo` 方法，屏幕缩放影响鼠标的相对移动，也就是 `moveMouseBy` 方法。鼠标dpi大小不影响任何操作**
- 参数:
  - `width` (`int`): 游戏宽度
  - `height` (`int`): 游戏高度
  - `dpi` (`double`): DPI缩放比例，默认为1，假如你的显示器设置是150%缩放，那这个值就是1.5

### moveMouseBy(int x, int y)
- 描述: 移动鼠标相对于当前位置的偏移量
- 参数:
  - `x` (`int`): 水平偏移量
  - `y` (`int`): 垂直偏移量

### moveMouseTo(int x, int y)
- 描述: 移动鼠标到指定位置
- 参数:
  - `x` (`int`): 目标位置的X坐标
  - `y` (`int`): 目标位置的Y坐标

### click(int x, int y)
- 描述: 在指定位置点击鼠标左键
- 参数:
  - `x` (`int`): 目标位置的X坐标
  - `y` (`int`): 目标位置的Y坐标

### leftButtonClick()
- 描述: 点击鼠标左键

### leftButtonDown()
- 描述: 按下鼠标左键

### leftButtonUp()
- 描述: 释放鼠标左键

### rightButtonClick()
- 描述: 点击鼠标右键

### rightButtonDown()
- 描述: 按下鼠标右键

### rightButtonUp()
- 描述: 释放鼠标右键

### middleButtonClick()
- 描述: 点击鼠标中键

### middleButtonDown()
- 描述: 按下鼠标中键

### middleButtonUp()
- 描述: 释放鼠标中键

### captureGameRegion()
- 返回类型: `ImageRegion`
- 描述: 捕获游戏区域的图像


## 日志 log

打印日志，支持占位符

举例：
```js
log.info('开始捕捉晶蝶，请在队伍中务必携带{zy}，使用成男/成女角色', '早柚');
```

### debug(string? message, params object?[] args)
- 描述: 在遮罩日志窗口输出调试级别的信息
- 参数:
  - `message` (`string?`): 日志消息
  - `args` (`object?[]`): 日志参数

### info(string? message, params object?[] args)
- 描述: 在遮罩日志窗口输出信息级别的信息
- 参数:
  - `message` (`string?`): 日志消息
  - `args` (`object?[]`): 日志参数

### warn(string? message, params object?[] args)
- 描述: 在遮罩日志窗口输出警告级别的信息
- 参数:
  - `message` (`string?`): 日志消息
  - `args` (`object?[]`): 日志参数

### error(string? message, params object?[] args)
- 描述: 在遮罩日志窗口输出错误级别的信息
- 参数:
  - `message` (`string?`): 日志消息
  - `args` (`object?[]`): 日志参数

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


## 原神 genshin

举例：
```js
// 传送
await genshin.tp('9041.2890625', '-2421.4799804688');
```


### width
- 类型: `int`
- 描述: 游戏宽度

### height
- 类型: `int`
- 描述: 游戏高度

### scaleTo1080PRatio
- 类型: `double`
- 描述: 游戏窗口大小相比1080P的缩放比例

### screenDpiScale
- 类型: `double`
- 描述: 系统屏幕的DPI缩放比例

### tp(string x, string y)
- 返回类型: `Task`
- 描述: 传送到指定位置
- 参数:
  - `x` (`string`): 目标位置的X坐标
  - `y` (`string`): 目标位置的Y坐标

  
## 路径追踪 pathingScript

### run(string json)
- 描述: 运行路径追踪任务
- 参数:
  - `json` (`string`): 自动路径任务的JSON字符串
- 返回类型: `Task`

### runFile(string path)
- 描述: 从文件中读取路径追踪任务并运行
- 参数:
  - `path` (`string`): 文件路径，只允许读取脚本目录下文件
- 返回类型: `Task`


## 键鼠脚本 keyMouseScript

```js
let filePath = `assets/file.json`;
await keyMouseScript.runFile(filePath);
```

### run(string json)
- 描述: 运行键鼠脚本任务
- 参数:
  - `json` (`string`): 键鼠脚本任务的JSON字符串
- 返回类型: `Task`

### runFile(string path)
- 描述: 从文件中读取键鼠脚本任务并运行
- 参数:
  - `path` (`string`): 文件路径，只允许读取脚本目录下文件
- 返回类型: `Task`
  
## 任务调度 dispatcher

### runTask()

调度实时任务和独立任务

```js
// 启用自动拾取的实时任务
dispatcher.addTimer(new RealtimeTimer("AutoPick"));
// 启用自动拾取的实时任务，并配置成启用急速拾取模式
dispatcher.addTimer(new RealtimeTimer("AutoPick", { "forceInteraction": true }));

// 执行自动秘境
await dispatcher.runTask(new SoloTask("AutoDomain"));
// 执行自动战斗
await dispatcher.runTask(new SoloTask("AutoFight"));
// 执行自动伐木
await dispatcher.runTask(new SoloTask("AutoWood"));
// 执行自动七圣召唤
await dispatcher.runTask(new SoloTask("AutoGeniusInvokation"));
```

### addTimer(RealtimeTimer timer)
- 描述: 添加实时任务
- 参数:
  - `timer` (`RealtimeTimer`): 实时任务触发器

### runTask(SoloTask soloTask)
- 描述: 运行独立任务
- 参数:
  - `soloTask` (`SoloTask`): 独立任务对象
- 返回类型: `Task`

