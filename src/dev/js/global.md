---
title: 全局方法
order: 20
---

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
- 描述: 捕获游戏区域的图像，用于图像识别，具体见 [图像识别与OCR](/dev/js/rec.html)


### inputText(string text)
- 描述: 输入文本
- 参数:
  - `text` (`string`): 文本

### inputText(string text)
- 描述：在输入框输入文本，需要确保输入框处于激活状态

### getAvatars()
- 返回类型：`string[]`
- 通过图像识别获取当前队伍角色，需要确保调用函数时位于主界面，并且是四人满编队伍。0.47.3 存在
- 示例：
```js
	var avatars = getAvatars();
	for (let i=0; i<avatars.length; i++){
		log.info(`第 ${i+1} 个角色为 ${avatars[i]}`);
	}
```
