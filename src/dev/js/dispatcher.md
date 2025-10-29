---
title: 调用任务
order: 60
---

## 任务调度 dispatcher

提供任务调度功能，支持实时任务和独立任务的执行。实时任务会在后台持续运行，而独立任务是前台单独执行的任务。  
> 具体的[实时任务](#实时任务-realtimetimer)与[独立任务](#独立任务-solotask)配置已在下文给出

### 基本用法

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

//执行自动秘境，支持传入参数
await dispatcher.runAutoDomainTask(new AutoDomainParam());

// 执行自动战斗，支持传入参数
await dispatcher.runAutoFightTask(new AutoFightParam());
```

## 方法

### addTimer(RealtimeTimer timer)
- 描述: 添加实时任务，会清理之前的所有任务
- 参数:
  - `timer` (`RealtimeTimer`): 实时任务触发器
- 异常: 如果任务名称为空或添加失败会抛出异常

### addTrigger(RealtimeTimer timer)
- 描述: 添加实时任务，不会清理之前的任务
- 参数:
  - `timer` (`RealtimeTimer`): 实时任务触发器
- 异常: 如果任务名称为空或添加失败会抛出异常

### clearAllTriggers()
- 描述: 清理所有实时任务
- 参数: 无

### runTask(SoloTask soloTask)
- 描述: 运行独立任务
- 参数:
  - `soloTask` (`SoloTask`): 独立任务对象
- 返回类型: `Task`
- 异常: 如果任务对象为空或任务名称未知会抛出异常

### getLinkedCancellationToken()
- 描述: （0.45.3新增）获取一个取消令牌，用于在多线程场景下取消任务
- 返回类型: `CancellationToken`

### runAutoDomainTask()
- 描述: 运行 独立任务-自动秘境
- 参数:
  - `param` (`AutoDomainParam`): 自动秘境参数对象
  - `customCt ` (`CancellationToken`): 取消令牌（可选，默认null）
- 异常: 如果参数对象为空会抛出异常

### runAutoFightTask()
- 描述: 运行 独立任务-自动战斗
- 参数:
  - `param` (`AutoFightParam`): 自动战斗参数对象
  - `customCt ` (`CancellationToken`): 取消令牌（可选，默认null）
- 异常: 如果参数对象为空会抛出异常

## 实时任务 RealtimeTimer

实时任务会在后台持续运行，支持多种任务类型。

### 构造函数

### RealtimeTimer()
- 描述: 创建空的实时任务对象

### RealtimeTimer(string name)
- 描述: 创建指定名称的实时任务
- 参数:
  - `name` (`string`): 任务名称

### RealtimeTimer(string name, object config)
- 描述: 创建带配置的实时任务
- 参数:
  - `name` (`string`): 任务名称
  - `config` (`object`): 任务配置对象

### 属性

### Name
- 类型: `string`
- 描述: 实时任务名称

### Interval
- 类型: `int`
- 描述: 任务执行间隔，单位毫秒，默认50ms

### Config
- 类型: `object`
- 描述: 任务配置对象

### 支持的任务类型

#### AutoPick
- 描述: 自动拾取任务，自动按F拾取掉落物、点击调查点、开宝箱等
- 配置参数(Config):
  - `forceInteraction` (`bool`): 是否强制交互，默认false
    - `true`: 无视文本和图标，遇到F就点击
    - `false`: 根据文本和图标判断是否点击F
  - `textList` (`string[]`): 需要按F的文本列表，例如：
    - `["F", "拾取", "对话", "调查", "开启"]` - 包含这些文本的选项会按F
    - `["F"]` - 只按包含"F"的选项
    - `[]` - 空数组，使用默认行为

#### 其他实时任务
以下任务类型仅支持实时模式，不支持配置参数：
- **AutoSkip**: 自动跳过对话任务，自动跳过剧情对话、过场动画等
- **AutoEat**: 自动吃食物任务，自动使用食物恢复生命值
- **AutoWood**: 自动伐木任务，自动砍伐树木获取木材
- **AutoFight**: 自动战斗任务，自动执行战斗操作
- **AutoDomain**: 自动秘境任务，自动执行秘境挑战
- **AutoFishing**: 自动钓鱼任务，自动执行钓鱼操作
- **AutoGeniusInvokation**: 自动七圣召唤任务，自动执行七圣召唤对局

## 独立任务 SoloTask

独立任务是一次性执行的任务，支持多种任务类型和配置参数。

### 构造函数

### SoloTask(string name)
- 描述: 创建指定名称的独立任务
- 参数:
  - `name` (`string`): 任务名称

### SoloTask(string name, object config)
- 描述: 创建带配置的独立任务
- 参数:
  - `name` (`string`): 任务名称
  - `config` (`object`): 任务配置对象

### 属性

### Name
- 类型: `string`
- 描述: 独立任务名称

### Config
- 类型: `object`
- 描述: 任务配置对象

### 支持的任务类型

#### 基础任务（无配置参数）
- **AutoDomain**: 自动秘境任务
- **AutoFight**: 自动战斗任务  
- **AutoWood**: 自动伐木任务

#### 配置任务（支持参数配置）

##### AutoFishing
- 描述: 自动钓鱼任务
- 配置参数:
  - `fishingTimePolicy` (`int`): 钓鱼时间策略，0=全天，1=白天，2=夜晚
  - `throwRodTimeOutTimeoutSeconds` (`int`): 抛竿超时时间（秒）
  - `wholeProcessTimeoutSeconds` (`int`): 整个任务超时时间（秒）

##### AutoEat
- 描述: 自动吃食物任务
- 配置参数:
  - `foodName` (`string`): 食物名称
  - `foodEffectType` (`int`): 食物效果类型，1=攻击，2=冒险，3=防御
  - 注意：`foodName` 和 `foodEffectType` 二选一

##### AutoGeniusInvokation
- 描述: 自动七圣召唤任务
- 配置参数:
  - `strategy` (`string`): 策略内容

##### CountInventoryItem
- 描述: 背包物品计数任务
- 配置参数:
  - `gridScreenName` (`string`): 背包标签名
  - `itemName` (`string`): 单个物品名称
  - `itemNames` (`string[]`): 物品名称数组
  - 注意：`itemName` 和 `itemNames` 二选一

## 完整示例

### 实时任务示例

```js
(async function() {
  try {
    // 创建自动拾取任务（带配置）
    const autoPickTimer = new RealtimeTimer("AutoPick", {
      "forceInteraction": true,
      "textList": ["F", "拾取", "对话", "调查"]
    });
    
    // 创建自动跳过任务（无配置）
    const autoSkipTimer = new RealtimeTimer("AutoSkip");
    
    // 添加到调度器（会清理之前的所有任务）
    dispatcher.addTimer(autoPickTimer);
    log.info("自动拾取任务已启动");
    
    // 等待一段时间
    await sleep(30000);
    
    // 切换到自动跳过任务
    dispatcher.addTimer(autoSkipTimer);
    log.info("自动跳过任务已启动");
    
    // 等待一段时间
    await sleep(20000);
    
    // 清理所有任务
    dispatcher.clearAllTriggers();
    log.info("所有实时任务已停止");
    
  } catch (error) {
    log.error(`实时任务执行失败: ${error.message}`);
  }
})();
```

### 独立任务示例

```js
(async function() {
  try {
    // 执行自动秘境
    log.info("开始执行自动秘境");
    await dispatcher.runTask(new SoloTask("AutoDomain"));
    log.info("自动秘境完成");
    
    // 执行自动钓鱼
    log.info("开始执行自动钓鱼");
    await dispatcher.runTask(new SoloTask("AutoFishing", {
      "fishingTimePolicy": 0,
      "throwRodTimeOutTimeoutSeconds": 30,
      "wholeProcessTimeoutSeconds": 300
    }));
    log.info("自动钓鱼完成");
    
    // 执行自动吃食物
    log.info("开始执行自动吃食物");
    await dispatcher.runTask(new SoloTask("AutoEat", {
      "foodName": "炸萝卜丸子"
    }));
    log.info("自动吃食物完成");
    
    // 计数背包物品
    log.info("开始计数背包物品");
    const result = await dispatcher.runTask(new SoloTask("CountInventoryItem", {
      "gridScreenName": "Food",
      "itemName": "炸萝卜丸子"
    }));
    log.info(`炸萝卜丸子数量: ${result}`);
    
  } catch (error) {
    log.error(`独立任务执行失败: ${error.message}`);
  }
})();
```

### 混合使用示例

```js
(async function() {
  try {
    // 启动实时任务
    dispatcher.addTimer(new RealtimeTimer("AutoPick"));
    log.info("实时拾取任务已启动");
    
    // 执行独立任务
    await dispatcher.runTask(new SoloTask("AutoDomain"));
    log.info("自动秘境完成");
    
    // 继续执行其他独立任务
    await dispatcher.runTask(new SoloTask("AutoFight"));
    log.info("自动战斗完成");
    
    // 清理实时任务
    dispatcher.clearAllTriggers();
    log.info("所有任务完成");
    
  } catch (error) {
    log.error(`任务执行失败: ${error.message}`);
  }
})();
```

## 注意事项

1. **任务间隔**：实时任务默认50ms间隔，可根据需要调整
2. **资源管理**：使用完后建议清理任务，避免内存泄漏
3. **配置参数**：不同任务类型支持不同的配置参数
4. **错误处理**：建议使用try-catch处理可能的异常
5. **任务切换**：使用 `addTimer()` 会清理之前的任务，使用 `addTrigger()` 不会
6. **性能影响**：实时任务会持续占用系统资源，建议在不需要时及时清理

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

### AutoDomainParam 自动秘境参数对象
默认使用本体设置的参数，但轮次是9999，可以初始化之后修改
- 参数:
  - `domainRoundNum`(`int`):(可选)默认为0,初始化时被重置为9999
- 初始化之后的参数:
  - `DomainRoundNum`(`int`): 秘境刷取轮数,0表示9999轮
  - `PartyName`(`string`): 队伍名称
  - `DomainName`(`string`):秘境名称
  - `SundaySelectedValue`(`string`):限时副本全开时，副本在秘境UI上的序号（注意类型是string）
  - `AutoArtifactSalvage`(`bool`):结束后是否自动分解圣遗物
  - `MaxArtifactStar`(`string`):分解圣遗物的最大星级（注意类型是string）
  - `SpecifyResinUse`(`bool`):是否指定树脂的使用次数
  - `OriginalResinUseCount`(`int`):使用原粹树脂刷取副本次数
  - `CondensedResinUseCount`(`int`):使用浓缩树脂刷取副本次数
  - `TransientResinUseCount`(`int`):使用须臾树脂刷取副本次数
  - `FragileResinUseCount`(`int`):使用脆弱树脂刷取副本次数
- 方法:
  - `SetCombatStrategyPath（）`：**设置要使用的战斗策略**
    - 参数：
      - `strategyName`(`string`) 同本体设置的格式，如："`群友分享\四神队(进阶版)`",为空则使用本体设置。可填"`根据队伍自动选择`"。

  - `SetResinPriorityList()`：**设置使用树脂优先级的列表**
    - 参数：`priorities`(`string[]`)
      - `原粹树脂`|`浓缩树脂`|`须臾树脂`|`脆弱树脂` ：没有做参数校验，务必保证名称填写正确。

### AutoFightParam 自动战斗参数对象
默认使用本体设置的参数，可以初始化之后修改，按照设置界面上的顺序列出
 - 参数：
   - `strategyName`(`string`|`null`): （可选）设置要使用的战斗策略,例：`群友分享\四神队(进阶版)`
 - 初始化之后的参数：
   - `ActionSchedulerByCd`(`string`): 根据技能CD优化出招人员，例：`白术;钟离,12`
   - 自动检测战斗结束
     - `FightFinishDetectEnabled`(`bool`):启用自动检测战斗结束
       - `FinishDetectConfig.FastCheckEnabled`(`bool`):  启用更快检查战斗结束
         - `FinishDetectConfig.FastCheckParams`(`string`):  更快检查结束战斗参数
       - `FinishDetectConfig.BeforeDetectDelay`(`string`): 按键触发后检查延时（单位：秒）
       - `FinishDetectConfig.RotateFindEnemyEnabled`(`bool`): 启用旋转寻找敌人
         - `CheckBeforeBurst`(`bool`):Q前检测
         - `IsFirstCheck`(`bool`):尝试面敌
         - `RotaryFactor`(`int`): 旋转速度
       - `FinishDetectConfig.CheckEndDelay`(`string`):  检查战斗结束的延时
     
   - 盾奶位角色优先释放技能
     - `GuardianAvatar`(`string`): 盾奶位角色在队伍中的位置（序号）
     - `GuardianCombatSkip`(`bool`):E元素战技。 Q / E任一为`true`则禁用该角色战斗策略，并按对应值自动释放Q / E
     - `BurstEnabled`(`bool`):Q元素爆发
     - `GuardianAvatarHold`(`bool`): 是否长按盾奶角色技能
   - 自动拾取掉落物
     - `PickDropsAfterFightEnabled`(`bool`): 启用战斗后拾取掉落物
     - `PickDropsAfterFightSeconds`(`int`): 自动拾取掉落物的时长（单位：秒）
     - `KazuhaPickupEnabled`(`bool`): 聚集材料动作 （如果存在 `琴` / `万叶`）
       - `QinDoublePickUp`(`bool`):角色 `琴` 二次拾取
     - `BattleThresholdForLoot`（`int`）:拾取战斗人次阈值
     - `OnlyPickEliteDropsMode`(`string`): 仅拾取精英掉落，仅支持以下两个参数,关闭可填 `Close`
       - **有效值：**
         - `AllowAutoPickupForNonElite` ：非精英允许自动拾取
         - `DisableAutoPickupForNonElite`：非精英关闭自动拾取
     - `KazuhaPartyName`(`string`):含有万叶的队伍名
   - `Timeout`(`int`): 战斗超时设置（单位：秒）
   - `FightFinishDetectEnabled`(`bool`): 启用自动检测战斗结束
   - `FinishDetectConfig.FastCheckEnabled`(`bool`): 启用更快检查战斗结束
   - `FinishDetectConfig.FastCheckParams`(`string`): 更快检查结束战斗参数
   - `FinishDetectConfig.CheckEndDelay`(`string`): 检查战斗结束的延时
   - `FinishDetectConfig.BeforeDetectDelay`(`string`): 按键触发后检查延时（单位：秒，默认0.45秒）
   - `FinishDetectConfig.RotateFindEnemyEnabled`(`bool`): 是否启用旋转寻找敌人
   - `PickDropsAfterFightEnabled`(`bool`): 启用战斗后拾取掉落物
   - `PickDropsAfterFightSeconds`(`int`): 自动拾取掉落物市场（单位：秒）
   - `KazuhaPickupEnabled`(`bool`): 是否启用万叶拾取模式
   - `ActionSchedulerByCd`(`string`): 根据技能CD优化出招人员
   - `GuardianAvatar`(`string`): 盾奶角色配置（序号）
   - `GuardianAvatarHold`(`bool`): 是否长按盾奶角色技能
   - `SwimmingEnabled`(`bool`):战斗中游泳检测
   - 还有几个参数因为0.52界面改了，忘了原本对应的功能，感兴趣可以去看本体代码


