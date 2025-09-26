---
title: 调用任务
order: 60
---

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
// 执行自动钓鱼(0.43.0新增)
await dispatcher.runTask(new SoloTask("AutoFishing"));
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

### getLinkedCancellationToken()
- 描述: （0.45.3新增）获取一个取消令牌，用于在多线程场景下取消任务
- 返回类型: `CancellationToken`

## 相关任务对象

### AutoFishing 自动钓鱼

- 参数:
  - `fishingTimePolicy` (`int`): 昼夜策略，钓全天的鱼、还是只钓白天或夜晚的鱼（全天：0、白天：1、夜晚：2）
  - `throwRodTimeOutTimeoutSeconds` (`int`): 自动抛竿未上钩超时时间(秒)
  - `wholeProcessTimeoutSeconds` (`int`): 整个任务超时时间(秒)


示例：

```js
// 执行自动钓鱼(0.43.0新增)
await dispatcher.runTask(new SoloTask("AutoFishing"));

// 带参数的执行
await dispatcher.runTask(new SoloTask("AutoFishing", { "fishingTimePolicy": 0 }));
```


### AutoEat 自动吃食物
(推荐先尝试仓库中的[使用料理JS脚本](https://github.com/babalae/bettergi-scripts-list/tree/main/repo/js/%E4%BD%BF%E7%94%A8%E6%96%99%E7%90%86)，该方案利用了游戏自带的筛选功能，更为实用)  
- 参数:
  - `foodName` (`string`): 食物名称，查找并吃该名称食物，不区分“美味的”等前缀
  - `foodEffectType` (`int`): 食物效果类型（攻击：1、冒险：2、防御：3），会按调度器配置吃对应类型的食物
  - 注意`foodName`和`foodEffectType`参数二选一，不可同时传递  

只支持单次使用的Buff类食物，不支持使用时须要选角色、多次确认的食物  
支持的食物取决于[GetGridIcons](https://bettergi.com/feats/task/getGridIcons.html)已训练的数据  
支持的食物清单详见[训练集原型特征.csv](https://github.com/babalae/bettergi-libraries/blob/main/BetterGI.Assets.Model/Assets/Model/Item/items.csv)  

另请关注背包界面背景对识别的干扰，如果游戏画面干扰导致识别失败，可参考[GetGridIcons](https://bettergi.com/feats/task/getGridIcons.html)调整并重试

示例：

```js
// 按名称找食物吃
await dispatcher.runTask(new SoloTask("AutoEat", { "foodName": "炸萝卜丸子" }));

// 使用调度器配置吃指定类型
await dispatcher.runTask(new SoloTask("AutoEat", { "foodEffectType": 1 }));
```

### CountInventoryItem 背包物品计数 
- 参数:
  - `gridScreenName` (`string`): 背包标签名，支持的值如下  
    | 值 | 标签名 |
    |---------|---------|
    | CharacterDevelopmentItems | 养成道具 |
    | Food | 食物 |
    | Materials | 材料 |
    | Gadget | 小道具 |
    | Quest | 任务 |
    | PreciousItems | 贵重道具 |
    | Furnishings | 摆设 |
  - `itemName` (`string`): 单个物品名称，验证是否受支持详见[训练集原型特征.csv](https://github.com/babalae/bettergi-libraries/blob/main/BetterGI.Assets.Model/Assets/Model/Item/items.csv)
  - `itemNames` (`Array<string>`): 物品名称数组
  - 注意`itemName`和`itemNames`参数二选一，不可同时传递 
- 方法返回参数:
  - `int` 数量（如果传入了`itemName`）  
    如果没有找到，则为-1；如果找到了但数字识别失败，则为-2
  - `Dict<string, int>` 一个可以当作字典操作的对象，键是物品名称，值是数量（如果传入了`itemNames`）  
    如果某个元素没有找到，则不会存在对应的键值；如果找到了但数字识别失败，则为-2

另请关注背包界面背景对识别的干扰，如果游戏画面干扰导致识别失败，可参考[GetGridIcons](https://bettergi.com/feats/task/getGridIcons.html)调整并重试

示例：

```js
// 按名称
const result = await dispatcher.runTask(new SoloTask("CountInventoryItem", { "gridScreenName": "Food", "itemName": "炸萝卜丸子" }));
log.Info(`数量: ${JSON.stringify(result)}`);

const resultDict = await dispatcher.runTask(new SoloTask("CountInventoryItem", { "gridScreenName": "Food", "itemNames": ["鸡豆花", "超级至尊披萨"] }));
log.Info(`鸡豆花 数量: ${JSON.stringify(resultDict["鸡豆花"])}`);
```
