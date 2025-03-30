---
title: 原神相关
order: 40
---

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

### tp(string x, string y, bool force)
- 返回类型: `Task`
- 描述: 传送到指定位置
- 参数:
  - `x` (`string`): 目标位置的X坐标
  - `y` (`string`): 目标位置的Y坐标
  - `force` (`bool`): 是否强制传送

### switchParty(string partyName)
- 返回类型: `Task`
- 描述: 切换队伍
- 参数:
  - `partyName` (`string`): 队伍界面自定义的队伍名称

### blessingOfTheWelkinMoon
- 返回类型: `Task`
- 描述: 自动点击空月祝福

### chooseTalkOption(string option, int skipTimes = 10, bool isOrange = false)
- 返回类型: `Task`
- 描述: 持续对话并选择目标选项
- 参数:
  - `option` (`string`): 选项文本
  - `skipTimes` (`int`): 跳过次数
  - `isOrange` (`bool`): 是否为橙色选项

### claimBattlePassRewards
- 返回类型: `Task`
- 描述: 一键领取纪行奖励

### claimEncounterPointsRewards
- 返回类型: `Task`
- 描述: 领取长效历练点奖励

### goToAdventurersGuild(string country)
- 返回类型: `Task`
- 描述: 前往冒险家协会领取奖励
- 参数:
  - `country` (`string`): 国家名称，当前只支持枫丹

### goToCraftingBench(string country)
- 返回类型: `Task`
- 描述: 前往合成台
- 参数:
  - `country` (`string`): 国家名称，当前只支持枫丹、璃月。推荐使用枫丹

### returnMainUi
- 返回类型: `Task`
- 描述: 返回主界面

### relogin
- 返回类型: `Task`
- 描述: 返回到登录界面并重新开门进入游戏，0.44版本新增

