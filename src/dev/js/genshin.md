# 修改后的原神相关文档

我将为您重新生成一份包含大地图操作部分的文档，保持原格式并优化表达。

```markdown:c:\Users\root\Documents\BetterGI\better-genshin-impact\docs\api\genshin.md
---
title: 原神相关
order: 40
---

## 原神 genshin

举例：
```js
// 传送
await genshin.tp('9041.2890625', '-2421.4799804688');

// 移动大地图到指定坐标
await genshin.moveMapTo(1000, 1000, '璃月');
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

## 大地图操作

### moveMapTo(int x, int y, string? forceCountry = null)
- 返回类型: `Task`
- 描述: 移动大地图到指定坐标
- 备注: 与内置传送功能不同，此方法不会多次重试。为避免初次中心点识别失败，建议先使用 `setBigMapZoomLevel` 设置合适的大地图缩放等级。
- 参数:
  - `x` (`int`): 目标X坐标
  - `y` (`int`): 目标Y坐标
  - `forceCountry` (`string?`): 强制指定移动大地图时先切换的国家，默认为null

### getBigMapZoomLevel()
- 返回类型: `double`
- 描述: 获取当前大地图缩放等级
- 返回值: 当前大地图缩放等级，范围1.0-6.0

### setBigMapZoomLevel(double zoomLevel)
- 返回类型: `Task`
- 描述: 将大地图缩放等级设置为指定值
- 备注: 
  - 数值范围：1.0(最大地图) 到 6.0(最小地图)
  - 缩放效果：数值越大，地图显示范围越广，细节越少
  - 缩放位置：1.0 对应缩放条最上方，6.0 对应缩放条最下方
  - 推荐范围：建议在 2.0 到 5.0 之间调整，过大或过小可能影响操作
- 参数:
  - `zoomLevel` (`double`): 目标缩放等级，范围 1.0-6.0

### tpToStatueOfTheSeven()
- 返回类型: `Task`
- 描述: 传送到用户指定的七天神像

## 队伍与界面操作

### switchParty(string partyName)
- 返回类型: `Task`
- 描述: 切换队伍
- 参数:
  - `partyName` (`string`): 队伍界面自定义的队伍名称

### blessingOfTheWelkinMoon()
- 返回类型: `Task`
- 描述: 自动点击空月祝福

### chooseTalkOption(string option, int skipTimes = 10, bool isOrange = false)
- 返回类型: `Task`
- 描述: 持续对话并选择目标选项
- 参数:
  - `option` (`string`): 选项文本
  - `skipTimes` (`int`): 跳过次数，默认为10
  - `isOrange` (`bool`): 是否为橙色选项，默认为false

### claimBattlePassRewards()
- 返回类型: `Task`
- 描述: 一键领取纪行奖励

### claimEncounterPointsRewards()
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

### returnMainUi()
- 返回类型: `Task`
- 描述: 返回主界面

### autoFishing(int fishingTimePolicy = 0)
- 返回类型: `Task`
- 描述: 自动钓鱼
- 参数:
  - `fishingTimePolicy` (`int`): 钓鱼时间策略，默认为0

### relogin()
- 返回类型: `Task`
- 描述: 返回到登录界面并重新开门进入游戏
```
