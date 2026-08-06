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

## 基本信息
### uid()
- 返回类型: `Promise<int>`
- 描述: 通过 OCR 识别当前角色 UID；识别失败返回 `0`。

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

```js
// 获取游戏窗口宽度
const width = genshin.width;

// 获取游戏窗口高度
const height = genshin.height;

// 获取游戏窗口相对于1080P的缩放比例
const scaleTo1080PRatio = genshin.scaleTo1080PRatio;

// 获取系统屏幕的DPI缩放比例
const dpiScale = genshin.screenDpiScale;
```

## 传送
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

### tp(double x, double y, string mapName, bool force)
- 返回类型: `Task`
- 描述: 传送到指定位置（指定地图）
- 参数:
  - `x` (`double`): 目标位置的X坐标
  - `y` (`double`): 目标位置的Y坐标
  - `mapName` (`string`): 地图名称，支持以下值：
    - `"Teyvat"` - 提瓦特大陆
    - `"TheChasm"` - 层岩巨渊
    - `"Enkanomiya"` - 渊下宫
    - `"SeaOfBygoneEras"` - 旧日之海
    - `"AncientSacredMountain"` - 远古圣山
  - `force` (`bool`): 是否强制传送
  
### tpToStatueOfTheSeven()
- 返回类型: `Task`
- 描述: 传送到用户指定的七天神像，0.44.2 新增

```js
// 使用数值坐标传送
await genshin.tp(1000.5, 2000.8);

// 使用字符串坐标传送
await genshin.tp("1000.5", "2000.8");

// 强制传送
await genshin.tp(1000.5, 2000.8, true);
await genshin.tp("1000.5", "2000.8", true);

// 传送到指定七天神像
await genshin.tpToStatueOfTheSeven();
```

## 大地图操作（0.44.3 新增）

### moveMapTo(int x, int y, string? forceCountry = null)
- 返回类型: `Task`
- 描述: 移动大地图到指定坐标
- 备注: 与内置传送功能不同，此方法不会多次重试。为避免初次中心点识别失败，建议先使用 `setBigMapZoomLevel` 设置合适的大地图缩放等级。
- 参数:
  - `x` (`int`): 目标X坐标
  - `y` (`int`): 目标Y坐标
  - `forceCountry` (`string?`): 强制指定移动大地图时先切换的国家，默认为null

### clickMapPoint(double x, double y, string? forceCountry = null)
- 返回类型: `Task`
- 描述: 将目标坐标移动到大地图可点击区域后点击一次。
- 参数: `x`、`y` 为游戏坐标；`forceCountry` 可选。

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

### getPositionFromBigMap()
- 返回类型: `Point2f`
- 描述: 获取当前在大地图上的位置坐标
- 备注:
  - 需要在大地图界面使用此方法
  - 返回的坐标使用游戏内坐标系统
  - 可用于获取当前角色在大地图上的精确位置
  - 返回的Point2f结构体包含X和Y属性，分别表示横纵坐标
- 参数: 无

### getCameraOrientation()
- 返回类型：`float`
- 描述：需要在主界面使用，获取当前的视角朝向的角度值。以水平轴向右为0度，逆时针方向角度递增。

### getPositionFromMap()
- 返回类型: `Point2f`
- 描述: 获取当前在小地图上的位置坐标
- 备注:
  - 只能在主界面使用，非主界面会抛出异常
  - 通过识别小地图上的角色位置获取坐标
  - 返回的坐标已转换为游戏世界坐标系统
  - 可用于实时获取角色在游戏世界中的位置
  - 如果识别失败可能会抛出异常
- 参数: 无
- 异常:
  - `InvalidOperationException`: 当不在主界面时抛出此异常

### getPositionFromMap(string mapName, int cacheTimeMs)
- 返回类型: `Point2f`
- 描述: 获取当前在小地图上的位置坐标（带缓存）
- 参数:
  - `mapName` (`string`): 地图名称，支持以下值：
    - `"Teyvat"` - 提瓦特大陆
    - `"TheChasm"` - 层岩巨渊
    - `"Enkanomiya"` - 渊下宫
    - `"SeaOfBygoneEras"` - 旧日之海
    - `"AncientSacredMountain"` - 远古圣山
  - `cacheTimeMs` (`int`): 缓存时间，单位毫秒，默认900ms
- 备注:
  - 如果缓存时间内有匹配成功的坐标优先返回缓存坐标
  - 否则调用NavigationInstance的getPositionStable

### getPositionFromMap(string mapName, float x, float y)
- 返回类型: `Point2f`
- 描述: 获取当前在小地图上的位置坐标（局部匹配）
- 参数:
  - `mapName` (`string`): 地图名称，支持以下值：
    - `"Teyvat"` - 提瓦特大陆
    - `"TheChasm"` - 层岩巨渊
    - `"Enkanomiya"` - 渊下宫
    - `"SeaOfBygoneEras"` - 旧日之海
    - `"AncientSacredMountain"` - 远古圣山
  - `x` (`float`): 世界坐标x
  - `y` (`float`): 世界坐标y
- 备注:
  - 局部匹配，需要世界坐标，在坐标附近匹配
  - 失败不进行全局匹配

### moveIndependentMapTo(int x, int y, string mapName, string? forceCountry)
- 返回类型: `Task`
- 描述: 移动独立大地图到指定坐标
- 参数:
  - `x` (`int`): 目标X坐标
  - `y` (`int`): 目标Y坐标
  - `mapName` (`string`): 指定要移动的大地图，支持以下值：
    - `"Teyvat"` - 提瓦特大陆
    - `"TheChasm"` - 层岩巨渊
    - `"Enkanomiya"` - 渊下宫
    - `"SeaOfBygoneEras"` - 旧日之海
    - `"AncientSacredMountain"` - 远古圣山
  - `forceCountry` (`string?`): 强制指定移动大地图时先切换的国家，默认为null
```
// 移动大地图到指定坐标
await genshin.moveMapTo(1000, 2000);

// 指定国家并移动大地图到指定坐标
await genshin.moveMapTo(1000, 2000, "璃月");

// 获取当前大地图缩放等级
const zoomLevel = genshin.getBigMapZoomLevel();

// 设置大地图缩放等级
await genshin.setBigMapZoomLevel(3.5);

// 获取当前在大地图上的位置坐标，确保调用之前在大地图界面
const bigMapPosition = genshin.getPositionFromBigMap();
log.info(`当前大地图坐标: X=${bigMapPosition.X}, Y=${bigMapPosition.Y}`);

// 获取当前在小地图上的位置坐标，确保调用之前在主界面
const miniMapPosition = genshin.getPositionFromMap();
log.info(`当前小地图坐标: X=${miniMapPosition.X}, Y=${miniMapPosition.Y}`);
```
## 队伍与界面操作

## 角色养成信息 characterDevelopmentTask

`characterDevelopmentTask` 是脚本引擎直接暴露的识别任务对象。调用前应处于可进入角色界面的主界面。

| 方法 | 返回 | 说明 |
|---|---|---|
| `getCharacter(characterName, categories?)` | `Promise<CharacterDevelopmentResult>` | 识别单个角色 |
| `getMultiCharacters(characterNames, categories?)` | `Promise<CharacterDevelopmentResult[]>` | 按 JS 字符串数组依次识别多个角色 |

`categories` 使用分号分隔，可选值为 `属性`、`武器`、`天赋`；省略时读取全部。未请求分类对应的字段为 `null`。

| 结果属性 | 类型 | 说明 |
|---|---|---|
| `characterName`、`elementType` | `string` | 角色名与元素类型 |
| `level`、`levelLimit` | `int?` | 角色等级与等级上限 |
| `weaponName` | `string?` | 武器名称 |
| `weaponLevel`、`weaponLevelLimit` | `int?` | 武器等级与等级上限 |
| `attackLevel`、`skillLevel`、`burstLevel` | `int?` | 普攻、战技、爆发显示等级 |
| `attackHasBonus`、`skillHasBonus`、`burstHasBonus` | `bool?` | 对应天赋是否显示固定等级加成 |

```js
const character = await characterDevelopmentTask.getCharacter("胡桃", "属性;武器");
const characters = await characterDevelopmentTask.getMultiCharacters(["胡桃", "夜兰"], "天赋");
```

### switchParty(string partyName)
- 返回类型: `Task`
- 描述: 切换队伍
- 参数:
  - `partyName` (`string`): 队伍界面自定义的队伍名称

### switchCharacter(string slot1 = "", string slot2 = "", string slot3 = "", string slot4 = "")
- 返回类型: `Promise<bool>`
- 描述: 按槽位重组当前队伍；空字符串跳过槽位，成功保存并返回主界面时为 `true`。

### clearPartyCache()
- 返回类型: 无返回
- 描述: 清空路径追踪期间生成的队伍缓存

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

### 合成操作

#### goToCraftingBench(string country)
- 返回类型: `Task`
- 描述: 前往合成台并打开合成界面，不执行合成。
- 参数:
  - `country` (`string`): 国家名称，当前只支持枫丹、璃月。推荐使用枫丹

#### goCraftResin(string country)
- 返回类型: `Task`
- 描述: 前往合成台并自动合成浓缩树脂。
- 参数:
  - `country` (`string`): 国家名称，当前只支持枫丹、璃月。推荐使用枫丹

#### craftMaterial(string materialName, int quantity, string? materialType = null)
- 返回类型: `Promise<CraftMaterialResult>`
- 描述: 在当前已经打开的合成界面中合成指定材料；本方法不会自行前往合成台。
- 参数:
  - `materialName` (`string`): 目标成品材料名
  - `quantity` (`int`): 合成数量，必须大于 `0`
  - `materialType` (`string?`): 材料筛选类型；省略时从物品模型中读取

```js
// 只前往合成台并打开合成界面
await genshin.goToCraftingBench("枫丹");

// 当前已在合成界面，可以继续合成材料
const result = await genshin.craftMaterial("精锻用魔矿", 10);

// 或者直接前往合成台并合成浓缩树脂
await genshin.goCraftResin("枫丹");
```

### returnMainUi()
- 返回类型: `Task`
- 描述: 返回主界面

### autoFishing(int fishingTimePolicy = 0)
- 返回类型: `Task`
- 描述: 自动钓鱼
- 参数:
  - `fishingTimePolicy` (`int`): 钓鱼时间策略，默认为0

### setTime(int hour, int minute, bool skip = false)
- 返回类型: `Task`
- 描述: 将派蒙页时钟调整到指定的游戏内时间
- 参数:
  - `hour` (`int`): 指定的小时，需在0-24之间，0与24效果一致，如设置6就调整到6点，24小时制
  - `minute` (`int`): 指定的分钟，需在0-59之间，如设置30就调整到30分
  - `skip` (`bool`): 是否跳过调整动画（目前跳过后暂时无法生效），默认为否

### setTime(string hour, string minute, bool skip = false)
- 返回类型: `Task`
- 描述: 将派蒙页时钟调整到指定的游戏内时间
- 参数:
  - `hour` (`string`): 指定的小时，需为0-24之间的字符，0与24效果一致，如设置"6"就调整到6点，24小时制
  - `minute` (`string`): 指定的分钟，需为0-59之间的字符，如设置"30"就调整到30分
  - `skip` (`bool`): 是否跳过调整动画（目前跳过后暂时无法生效），默认为否

### relogin()
- 返回类型: `Task`
- 描述: 返回到登录界面并重新开门进入游戏

### wonderlandCycle()
- 返回类型: `Task`
- 描述: 进入到千星奇域大厅并返回提瓦特（0.55.1新增）

