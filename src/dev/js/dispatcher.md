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

#### AutoFishing 自动钓鱼

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
