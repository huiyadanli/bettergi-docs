---
title: 自动战斗与秘境
order: 30
---
::: warning 分辨率

自动战斗支持全 `16:9` 分辨率，自动秘境支持大于等于 `1920x1080` 的 `16:9` 分辨率
原神5.7版本ui变化后，0.45前版本将无法使用自动秘境功能。
:::

功能演示与说明视频：

- [YouTube](https://www.youtube.com/watch?v=sT4PoCBLxrU)
- [抖音](https://www.douyin.com/user/self?modal_id=7329173584650308890)

---

自动秘境中自带有自动战斗的功能，两者配置共用，自动战斗任务可以在秘境外被启用。

## 自动战斗

在使用自动秘境功能前，请先正确配置自动战斗功能。

启动后，BetterGI 会识别出当前右侧角色配队阵容，只支持4人队，支持流浪者识别、主角识别。然后执行选择的战斗策略。

配队识别和战斗策略执行是完全独立的，也就是说队伍角色不来源于战斗策略，战斗策略中也无队伍中角色在几号位置的信息。

### 配队识别失败？

0.27版本之后几乎不存在老角色无法正常识别的问题了。但是强制指定配队功能依旧保留：

可以直接在“独立任务”页设置“强制指定配队”，用逗号分割（中英文都可以），**注意必须使用角色的官方中文名！必须是4人队伍！**

比如：`钟离，雷电将军，纳西妲，芙宁娜`

### 战斗策略脚本编写

和“七圣召唤”一样，战斗策略也提供了对应的自定义脚本配置，编写一个 `UTF-8` 格式的文本文件放入 `\User\AutoFight\` ，就能在 BetterGI 界面上看到并选择对应的战斗策略。建议直接复制一个已有的脚本进行修改。

::: tip
`0.62.0` 起还支持带执行条件的 JSON 战斗策略，写法见 [JSON 战斗策略](#json-战斗策略)。
:::

**和配队配置一样，角色名称必须使用官方中文名称！**

脚本语法如下：

| 名称 | 方法 | 别名 | 参数 | 说明 | 示例 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| 元素战技 | skill | e | hold 代表长按，wait代表等待技能cd结束，选填 | 触发键盘按下e键，并等待200ms。夜兰按两次e才能中断元素战技的释放。其中纳西妲长e会自动旋转。 | `skill`,`e`,`e(hold)`,`e(hold,wait)` |
| 元素爆发 | burst | q |  | 触发键盘按下q键，至少会等待1.7秒，建议下一步动作为切换角色，保证元素爆发释放完成。 | `burst`,`q` |
| 普通攻击 | attack |  | 普攻持续时间(s)，选填 | 触发左键连击，每200ms触发一次左键单击 | `attack`,`attack(5.5)` |
| 重击   | charge |  | 长按的持续时间(s)，选填 | 长按左键。其中那维莱特重击会自动旋转。 | `charge`,`charge(6)` |
| 等待   | wait |  | 等待时间(s)，必填 | 程序等待   | `wait(0.5)` |
| 准备就绪 | ready |  |  | 等待大招动画结束，四星角色无效，等待上限4秒 | `ready` |
| 冲刺   | dash |  | 冲刺时间(s)，选填 | 朝当前方向冲刺 | `dash`,`dash(2)` |
| 跳跃   | jump | j |  | 跳跃一下   | `jump` |
| 行走   | walk |  | 1. 行走的方向，必填 2. 行走的时间(s)，必填 | 按下w/a/s/d行走 | `walk(w,0.2)` |
| 向前行走 | w |  | 行走的时间(s)，必填 | 按下w行走，等效于`walk(w,?)` | `w(0.2)` |
| 向左行走 | a |  | 行走的时间(s)，必填 | 按下a行走，等效于`walk(a,?)` | `a(0.2)` |
| 向后行走 | s |  | 行走的时间(s)，必填 | 按下s行走，等效于`walk(s,?)` | `s(0.2)` |
| 向右行走 | d |  | 行走的时间(s)，必填 | 按下d行走，等效于`walk(d,?)` | `d(0.2)` |
| 结束检测 | check |  |  | 进行一次战斗结束检测，依赖于自动战斗的各项配置 | `check` |

切换角色的时候会保证切换成功，但是元素战技/元素爆发的释放判断是没有的，所以请灵活使用wait保证技能释放成功。

`//` 开头可以作为注释，不会被执行。

**战斗策略中存在非当前队伍内的角色会被忽略，不会影响战斗策略的执行。可以利用这一特性编写通用的支持不同配队的单文件战斗策略。**

换行和英文分号都可以分割语句。

示例:

::: tabs

@tab 四神队.txt
```js
钟离 s(0.2),e(hold),wait(0.3),w(0.2),q
雷电将军 e
纳西妲 e(hold),wait(0.3),q
芙宁娜 e,wait(0.3),q
```
@tab 双水宵宫.txt
```js
钟离 s(0.2),e(hold),wait(0.3),w(0.2),q
夜兰 e,e,wait(0.8),e,e,wait(1.5),q
行秋 e,e,q
宵宫 e,attack(5)
```

@tab 宵宫通用队.txt
```js
钟离 s(0.1),e(hold),wait(0.3),w(0.1)
芙宁娜 e,q
行秋 e,q,e
夜兰 e,e,wait(0.2),e,e,q
云堇 e,q
班尼特 e,q
//琴 e,q   不识别
早柚 e,e,q
枫原万叶 e,attack(0.1),q
宵宫 e,attack(5.5)

//推荐配队
//钟离 (夜/行/班/云/万)四选二 宵宫       不推荐云堇万叶一起上
//钟离 芙宁娜 琴/早柚/班尼特 宵宫        风奶带风套最好(金珀小鹿？金珀砂糖？金珀散兵？)，其他奶凑合用
```

@tab 钟那芙琴(非满命).txt
```js
钟离 s(0.2),e(hold),wait(0.3),w(0.2),q
那维莱特 e
芙宁娜 e,q
琴 e
那维莱特 charge(3)
钟离 e(hold),wait(0.3)
琴 q
那维莱特 e,charge(3),q,charge(3),charge(3)
```

@tab 妮绽放(无霸体).txt
```js
白术 e,q
纳西妲 e(hold),wait(0.3),q
妮露 e,e,e,e,e,e,e,e
珊瑚宫心海 e,attack(2)
白术 e
珊瑚宫心海 q,attack(2)
```
:::

### 战斗策略脚本 - 高级语法

战斗策略脚本中实际支持更多键鼠操作相关的语法，可以实现普通脚本语法所有功能，同时还可以实现更多高级的操作。

实际就是类似软件宏的操作。**注意高级语法和`wait`不会判断角色是否切换成功，如果一个角色战斗脚本中只有高级语法和`wait`，请在最前面添加一个`attack`用于强制让程序判断角色是否切换成功。**


| 名称 | 方法 | 参数 | 示例                                 |
| ---- | ---- | ---- |------------------------------------|
| 鼠标按下 | mousedown | 鼠标按键left、right、middle，选填，不填默认left | `mousedown(left)`,`mousedown`      |
| 鼠标松开 | mouseup | 鼠标按键left、right、middle，选填，不填默认left | `mouseup(right)`,`mouseup`       |
| 鼠标单击 | click | 鼠标按键left、right、middle，选填，不填默认left | `click`,`click(middle)`            |
| 鼠标相对移动 | moveby | 1. X轴移动相对距离，向左转动为负数，向右为正数，必填。2. Y轴移动距离，向上转动为负数，向下为正数，必填 | `moveby(500,0)`,`moveby(100,-100)` |
| 滚轮滚动  | scroll | 滚轮滚动的格数，向下为正数，向上为负数，必填                                  | `scroll(1)`            |
| 键盘按下  | keydown | 键盘按下键的名称，必填，[按键代码](/feats/append/keycodes.html)         | `keydown(A)`                       |
| 键盘松开  | keyup | 键盘松开键的名称，必填，[按键代码](/feats/append/keycodes.html)         | `keyup(D)`                         |
| 键盘点按  | keypress | 键盘点按键的名称，必填，[按键代码](/feats/append/keycodes.html)         | `keypress(F1)`                     |

示例:

* 在释放元素战技后，按下 F1 吃球后 ESC 退出： `e,wait(1),keypress(F1),wait(1),keypress(ESCAPE)`
* 胡桃12A重： `e,wait(0.3),charge(0.3),wait(0.1),dash,wait(0.1),charge(0.3),wait(0.1),dash,wait(0.1),charge(0.3),wait(0.1),j,wait(0.52),charge(0.3),wait(0.1),dash,wait(0.1),charge(0.3),wait(0.1),dash,wait(0.1),charge(0.3),wait(0.1),j,wait(0.52),charge(0.3),wait(0.1),dash,wait(0.1),charge(0.3),wait(0.1),dash,wait(0.1),charge(0.3),wait(0.1),j,wait(0.52),charge(0.3),wait(0.1),dash,wait(0.1),charge(0.3),wait(0.1),dash,wait(0.1),charge(0.3),wait(0.1),j,wait(5)`
* 滑步弓： `mousedown(left),wait(0.001),mouseup(left),wait(0.218),mousedown(left),wait(0.001),mouseup(left),wait(0.219),mousedown(left),wait(0.25),mouseup(left),wait(0.206)`
* 可莉走A：`keydown(w),wait(0.08),attack(0.05),keyup(w),wait(0.2)`


**感谢群友 `@爱司基模人` 编写并分享的大量战斗脚本。**

### JSON 战斗策略

::: tip
JSON 策略需要 `0.62.0` 及以上的 BetterGI，本文按 **`0.64.0` 及以上**编写（更早的版本缺少部分条件函数，建议直接使用最新版本）。把 `.json` 文件放入 `\User\AutoFight\`（支持子目录，子目录里的文件在列表里显示为 `子目录/文件名`），然后在战斗配置里选择它即可；自动战斗、自动秘境、自动首领讨伐、地脉花、路径追踪/一条龙这些入口都会自动识别 `.json`。

JSON 策略和 TXT 策略使用同一套动作写法（`e`、`attack(0.5)`、`wait(1)`、`check`、键鼠高级语法……），区别是每个动作可以写**执行条件**，程序按条件挑选要执行的动作。

注意：同名时只会用一个文件，**`.json` 优先**（没有 `.json` 才用 `.txt`）；「根据队伍自动选择」只适用于 TXT 策略包目录，JSON 策略请直接选择文件名。
:::

JSON 策略用文本编辑器就能写；策略较长时推荐用社区配套的[战斗策略编辑器](https://github.com/Bedrockx/betterautofight)（导入/导出、指令与条件补全、格式检查、自带示例策略；仓库内为源码，需用 .NET 8 构建）。

#### 文件结构

```json
{
  "info": {
    "name": "示例策略",
    "author": "你的名字",
    "description": "一句话说明",
    "config": {},
    "preActions": []
  },
  "actions": [
    {
      "name": "钟离-开盾",
      "character": "钟离",
      "action": "e(hold),wait(0.2)",
      "condition": { "expression": "e-ready && since>12" },
      "ensureCast": true,
      "index": 10
    }
  ]
}
```

| 字段 | 说明 |
| ---- | ---- |
| `info.name`、`author`、`description` | 备注信息，只用于界面和日志显示 |
| `info.config` | 预留字段，填 `{}` 即可；不会覆盖 BetterGI 里的战斗配置 |
| `info.preActions` | 开战后**无视条件**依次执行的动作，每项是「角色名 + 空格 + 指令串」，例如 `["钟离 e(hold),wait(0.2)", "茜特菈莉 e"]`；不写角色名的项由当前角色执行 |
| `name` | 动作名，用于日志和排查问题，建议写成「角色-用途」 |
| `character` | 执行该动作的角色，执行前会切换并确认切换成功；留空表示用当前角色；**角色不在队伍中时该动作会被忽略** |
| `action` | 动作指令，写法与 TXT 策略完全一致，多条用英文逗号分隔 |
| `condition.expression` | 执行条件，留空表示始终满足 |
| `ensureCast` | 设为 `true` 时，动作结束后会检查 E 技能是否真的进入冷却，没成功就重试（最多 5 次），适合盾奶开盾 |
| `index` | 优先级序号，**数字越小越优先**，建议按 10、20、30 留出间隔方便以后插入；被 `since(序号)`、`count(序号)` 引用时不要与其他动作重复 |
| `morePriorities` | 给同一动作增加额外的「条件 + 优先级」入口，见下方完整示例 |
| `redArrowAim` | 红箭头索敌对准：动作期间自动把镜头对准敌人方向，见下文 |

::: tip 长按与点按
`e` 是点按、`e(hold)` 是长按，两者在游戏里常常是两个不同的效果：**钟离的护盾来自长按 E**，写 `e` 只会插岩脊，所以盾位动作要写 `e(hold)`。纳西妲、坎蒂丝、恰斯卡（以及包含梦见月瑞希特化的版本）的长按特化也只在 `e(hold)` 时触发。
:::

#### 程序会怎么执行

1. 按 `index` 从小到大依次检查每个动作的条件（动作在文件里的先后不影响执行顺序）；
2. **执行第一个满足条件的动作**，然后立刻从最小的 `index` 重新检查；
3. 所有条件都不满足时等待约 200ms 再检查。

所以每个动作的条件都要能自己变回不满足（例如技能进入冷却、或距上次执行超过 N 秒），否则它会一直排在最前面，后面的动作永远轮不到。也可以在文件最后放一个兜底动作占位，见下方完整示例的「兜底等待」。

#### 条件写法

表达式的最终结果按「满足 / 不满足」判断，支持 `&&`、`||`、`!`、`(` `)`、`>`、`<`、`=`、`+`、`-`、`*`、`/`：布尔参与数值运算时 `true` 记作 `1`、`false` 记作 `0`，数值只有大于 0 才算满足。

| 写法 | 含义 |
| ---- | ---- |
| `t` | 开战至今的秒数，如 `t>15` |
| `since` | **本动作**距上次执行的秒数，如 `since>20`；从未执行过视为已过很久（条件成立） |
| `since(10)` | 序号为 10 的动作距上次执行的秒数；也可以写动作名，如 `since(钟离开盾)` |
| `count(10)` | 序号为 10 的动作总共执行了几次，如 `count(10)>0` 表示它已经执行过 |
| `count(10, t-10, t)` | 序号为 10 的动作最近 10 秒内执行了几次 |
| `last-exec(15)` | 本动作距上次执行是否已超过 15 秒；`last-exec(10,false,20)` 判断 20 号动作是否**不足** 10 秒 |
| `battle-time(30)` | `t` 的布尔写法：开战是否已超过 30 秒 |
| `min(...)`、`max(...)` | 取多个表达式的最小 / 最大值，如 `min(since, 5)` |
| `e-ready`、`q-ready` | 本动作所属角色的 E / Q 是否就绪，如 `e-ready && since>12`；E 没有冷却记录时视为就绪 |
| `e-ready(钟离)`、`q-ready(钟离)` | 指定角色的 E / Q 是否就绪；`e-cd(钟离)<5` 表示剩余冷却小于 5 秒 |
| `low-hp` | 场上角色是否低血（以游戏中的红血提示为准，只看场上角色） |
| `in-party(芙宁娜)` | 该角色是否在当前队伍中 |
| `onfield` | 本动作所属角色是否在场上 |
| `last-check()` | 距上一次战斗结束检测的秒数 |

::: warning 两个最容易写错的地方
* `since(10)>0.4` 是「10 号动作距上次执行已超过 0.4 秒」，**10 号从未执行过时同样成立**（从未执行算作很久以前）；它不是「等 10 号跑完 0.4 秒后再执行我」。
* 想让两条指令严格连着执行（例如普攻后接 E），不要拆成两个动作去等，直接写在同一条 `action` 里：`"action": "attack,wait(0.2),e"`。
:::

#### 常用编排模式

**限制时间窗内的次数**：某个动作在最近一段时间里最多执行几次：

```json
{
  "name": "普攻补刀",
  "character": "芙宁娜",
  "action": "attack(0.6)",
  "condition": { "expression": "count(100,t-10,t)<2" },
  "ensureCast": false,
  "index": 100
}
```

**用空动作当状态标记**：`action` 留空的动作不按键，但同样会记录执行时间，其他动作可以用 `since(序号)` 读到这个状态。条件里要给它自己也加一个冷却（`since`），否则它每轮都会刷新时间戳，读出来永远是 0：

```json
{
  "name": "红血标记",
  "character": "",
  "action": "",
  "condition": { "expression": "low-hp && since>3" },
  "ensureCast": false,
  "index": 1
}
```

**表达技能刷新关系**：`since(104) > 8 || since(104) > since(105)` 表示「104 号自然冷却已过，或 105 号比 104 号更晚执行过」，常用于「Q 刷新 E」这类机制。

**临时关掉一条动作**：把 `condition` 写成 `false` 即可，动作会留在文件里但不执行；社区策略里常用它保留备用动作（下文红箭头索敌对准的示例就是这种写法）。

#### 完整示例

```json
{
  "info": {
    "name": "示例-尼可/玛薇卡/芙宁娜/枫原万叶",
    "author": "你的名字",
    "description": "尼可开盾、芙宁娜与玛薇卡速切、万叶聚怪；战后拾取由 BetterGI 配置负责",
    "config": {},
    "preActions": []
  },
  "actions": [
    {
      "name": "尼可-开盾",
      "character": "尼可",
      "action": "e",
      "condition": { "expression": "e-ready && since>15" },
      "ensureCast": true,
      "index": 10
    },
    {
      "name": "芙宁娜-E",
      "character": "芙宁娜",
      "action": "e,wait(0.3)",
      "condition": { "expression": "since>20 && e-ready" },
      "ensureCast": false,
      "index": 30,
      "morePriorities": [
        { "expression": "since>28 && e-ready", "priority": 20 }
      ]
    },
    {
      "name": "玛薇卡-普攻接E",
      "character": "玛薇卡",
      "action": "attack,e",
      "condition": { "expression": "e-ready && since>15" },
      "ensureCast": false,
      "index": 31
    },
    {
      "name": "玛薇卡-Q",
      "character": "玛薇卡",
      "action": "q,wait(0.1),ready",
      "condition": { "expression": "q-ready && since>15" },
      "ensureCast": false,
      "index": 32
    },
    {
      "name": "玛薇卡-站场连招",
      "character": "玛薇卡",
      "action": "wait(0.2),mousedown(left),wait(0.265),mouseup(left),wait(0.05),mousedown(left),wait(0.18),mousedown(right),wait(0.2),mouseup(right),wait(0.03),mouseup(left),wait(0.03),mousedown(left),wait(0.15),mousedown(right),wait(0.1),mouseup(right),wait(0.05),mouseup(left),wait(0.05),mouseup(left),wait(0.05),mouseup(left),wait(0.05),mouseup(left),wait(0.05),keydown(space),wait(0.1),keyup(space),attack(0.2),wait(0.7),mousedown(left),wait(0.18),mousedown(right),wait(0.2),mouseup(right),wait(0.03),mouseup(left),wait(0.03),mousedown(left),wait(0.15),mousedown(right),wait(0.1),mouseup(right),wait(0.05),mouseup(left),wait(0.05),mouseup(left),wait(0.05),mouseup(left),wait(0.05),mouseup(left),wait(0.05),keydown(space),wait(0.1),keyup(space),attack(0.2),wait(0.7),mousedown(left),wait(0.18),mousedown(right),wait(0.2),mouseup(right),wait(0.03),mouseup(left),wait(0.03),mousedown(left),wait(0.15),mousedown(right),wait(0.1),mouseup(right),wait(0.05),mouseup(left),wait(0.05),mouseup(left),wait(0.05),mouseup(left),wait(0.05),mouseup(left),wait(0.05),keydown(space),wait(0.1),keyup(space),attack(0.2),check,wait(0.3)",
      "condition": { "expression": "since(玛薇卡-Q)<1 && last-exec(18)" },
      "ensureCast": false,
      "index": 33
    },
    {
      "name": "万叶-中E",
      "character": "枫原万叶",
      "action": "attack,keydown(E),wait(0.48),keyup(E),attack(0.3),wait(0.2)",
      "condition": { "expression": "since>8 || since>since(万叶-Q)" },
      "ensureCast": false,
      "index": 100
    },
    {
      "name": "芙宁娜-Q",
      "character": "芙宁娜",
      "action": "q,wait(0.1),ready",
      "condition": { "expression": "q-ready && since>15" },
      "ensureCast": false,
      "index": 101
    },
    {
      "name": "万叶-Q",
      "character": "枫原万叶",
      "action": "q,wait(0.1),ready",
      "condition": { "expression": "q-ready && since>15" },
      "ensureCast": false,
      "index": 102
    },
    {
      "name": "尼可-Q",
      "character": "尼可",
      "action": "q,wait(0.1),ready",
      "condition": { "expression": "q-ready && since>15" },
      "ensureCast": false,
      "index": 103
    },
    {
      "name": "兜底等待",
      "character": "",
      "action": "wait(0.2)",
      "condition": { "expression": "" },
      "ensureCast": false,
      "index": 999
    }
  ]
}
```

这套动作与条件取自社区策略[公式化锄地](https://github.com/Bedrockx/betterautofight)里该配队的部分（配队公式：芙宁娜 + 盾位 + 其他），其中玛薇卡的站场连招取自同一作者的「火芙万茜」，可以直接拿去改。几点说明：

* `index` 越小越优先；示例按「盾位 10 → 辅助/主C 30 段 → Q 与万叶 100 段 → 兜底 999」分号段，留出空号方便以后插入新动作。
* `morePriorities` 让同一个动作有多个「条件 + 优先级」入口：上例的芙宁娜 E 平时在优先级 30 排队，超过 28 秒还没放出来就以优先级 20 抢先执行。
* 同一个 `index` 下也可以放多条动作（社区策略靠它让一套策略适配多种配队：`character` 不在队伍里的动作会被忽略），但这时按 `index` 引用会有歧义，建议改用 `since(动作名)`（如上例的 `since(万叶-Q)`）。
* 玛薇卡那条「站场连招」是很长的指令串，用条件卡住释放时机：`since(玛薇卡-Q)<1` 表示「紧跟她的 Q 之后」（`since` 没执行过时是正无穷，所以不会提前触发），`last-exec(18)` 表示这条动作自己 18 秒内只打一次，避免长连招每轮都占时间。
* 万叶中 E 的条件后半句 `since>since(万叶-Q)` 依赖「Q 重置 E」（1 命效果），没这个效果时把后半句删掉、只留 `since>8`。
* 万叶在战斗中用中 E 聚怪，战斗结束后吸掉落物由 BetterGI 的「万叶/琴拾取」配置负责，不需要写进策略。
* 文中没出现的角色或技能，都可以按同样的写法继续往下加。

#### 红箭头索敌对准

给需要正对敌人输出的动作加上 `"redArrowAim": true` 即可开启：

* 动作开始前，把视角拉到最低俯视；
* 动作期间持续旋转视角，让最接近屏幕正上方的红箭头尽量对准屏幕正上方（也就是朝向敌人）；动作期间会暂时关闭「战斗中持续索敌」，避免两边同时转视角；
* 该动作结束、且下一个动作没有开启本字段时，点按一次鼠标中键把视角回正；战斗结束时同样回正。

最典型的用法是「一边靠近敌人一边把镜头对准它」。下面是社区策略「公式化锄地」里现成的一条：`character` 留空表示用当前场上的角色（源文件里就是这种通用写法，谁在场就谁去靠近），只想让指定角色靠近时就写成角色名（例如 `"character": "梦见月瑞希"`）；`condition` 写 `false` 表示默认不执行，需要时换成实际条件即可：

```json
{
  "name": "尝试靠近",
  "character": "",
  "action": "keydown(w),wait(0.75),keyup(w),keypress(x)",
  "condition": { "expression": "false" },
  "ensureCast": false,
  "redArrowAim": true,
  "index": 1
}
```

连续几个动作都要对准时（例如主 C 的一整套输出），给它们都加上这个字段，中间就不会来回切视角。

::: tip 梦见月瑞希
在包含「梦见月瑞希 E(hold) 特化」的版本里，她直接写 `e(hold)` 就够了：引擎会在长按 E 期间自动低头前进并按红箭头索敌，结束时再点按一次 E 退出技能 —— 不需要手写走位串，也不需要 `redArrowAim`。上游版本没有这个特化，写 `e` 点按 + 手写左右交替走位即可，例如社区策略「全配队通用（日常向）」里的写法：`w(0.05),e,wait(0.2),w(0.2),a(0.2),s(0.3),d(0.3),w(0.2),a(0.2),s(0.2),d(0.2)……`

她的 E 是悬浮状态（持续 5~10 秒，或再按一次 E 结束），期间不能普攻/重击、要靠左右交替走位移动，退场即失效；Q 造成风伤，并在 12 秒内持续产生额外风伤与治疗。
:::

::: warning
`redArrowAim` 需要支持该功能的版本，旧版本会忽略这个字段，不影响其余动作执行。
:::

## 自动秘境

请站在秘境门口或者在进入秘境时候启动”自动秘境“功能，启动后自动刷本直到用光体力结束（OCR识别浓缩树脂数量的准确率不高，建议保留20以上的体力保证能够自动循环刷取，或者手动设置刷取次数）。当然也可以在设置中配置刷取次数。

![站在秘境门口启动（推荐）](https://img.alicdn.com/imgextra/i2/2042484851/O1CN016CLDxN1lhoELu85HD_!!2042484851.jpg_400x400)

![或在进入秘境时候启动（方便周日选材料）](https://img.alicdn.com/imgextra/i2/2042484851/O1CN01CXj1yP1lhoEfFHn0G_!!2042484851.jpg)

请保证进入前有背包有空间领取奖励，不然会卡死在领取奖励的过程中。

使用此功能前请确保自动战斗功能能够正常运行。

### 启用奖励识别

开启后，每轮领取奖励后会识别奖励名称与数量，并在自动秘境结束时输出汇总。

奖励识别使用图标匹配和 OCR 双路识别，当前仅支持 `1920x1080` 分辨率下的领奖结果页。若需要排查识别问题，可以在「设置 - 截图」中开启「保存奖励识别截图」，调试图片会保存到 `log\RewardRecognition`。

## 常见问题

### ❓有没有用XXX的队伍？

仓库中较新的战斗策略需要考虑角色配队的泛用性，本身拥有位移的角色因为会坠崖等原因，更不适合大世界使用。此外，战斗策略作者较少，上传频率非常低，也欢迎你提交好用的策略。

### ❓有没有好的配队？
如果你在浏览过已有的`战斗策略`后，没有找到自己想用的，同时也不知道使用什么配队，此处可作出一些指导：  
* 后台输出角色非常重要，如：`芙宁娜`、`玛薇卡`、`菈乌玛`、`伊涅芙`等。
* 回复类角色中最推荐`爱可菲`、`白术`、`芭芭拉（金箔）`，其他法器角色请使用金箔。
* ⚠️不要过于追求输出，存活才是关键！要抛弃打深渊的配队思路！
* ⚠️不要使用有位移的角色，容易导致位置跳水、坠崖等不可预知情况！
* 有`枫原万叶`用于拾取可以极大提高效率。
* 配队公式：盾（必须）+ 后台c + 副后台c/奶（可选）+ 万叶（如没有可换成琴）。

### ❓战斗经常超时或卡死？

* 战斗策略的本质不过是依次切出角色放技能，因此如果你的角色过于容易死亡，会导致多次回到点位重试战斗直到超时。  
* 一些用户习惯将包含位移技能的角色编入队中，此类做法不太提倡，你的角色可能会因此掉入水中、坠下悬崖、脱离战斗等。角色举例：`夜兰`、`八重神子`、`恰斯卡`等。

### ❓打不过秘境？

自动战斗在秘境对于练度是有一定要求的，且对盾角色（钟离）的依赖性很强，一个纯堆血量钟离必不可缺。自动秘境功能不建议新手（低命低练度）玩家使用。

### ❓石化古树无法识别？

如果截图模式用的是 `DwmGetDxSharedSurface`，切换到 `WindowsGraphicsCapture` 也许会解决问题。

当前训练集有限，只是训练一些高频刷取的本的石化古树（枫丹新本、绝缘、每个地区具有代表性的圣遗物本）。

如果出现无法识别到石化古树的现象，请联系作者补充训练集。

### ❓战斗结束后原地转圈？

原神设置中的“小地图锁定”，必须是“锁定方向”。“锁定玩家视角”会导致原地转圈

### ❓4k进入秘境后停留在秘境提示处没有反应？

已知bug，但是由于没有设备，暂时无法修复。可以尝试使用1080P窗口。

### ❓进入秘境后冲刺了一下不走了？

已知bug，换号后可能会出现此类情况，重启软件后就能恢复正常。新版本已经不会再出现这个问题

### ❓角色在场上长时间发呆，持续发出切人的声音

首先确认你完整阅读过 [快速上手](/quickstart.html) , 并且自动拾取能够正常使用。

造成这个情况的只有两个原因

1. 你开了游戏滤镜
2. 你的分辨率不是 16:9

### ❓自动秘境配置了队伍，但是切换失败

建议使用汉字命名队伍名称，短的数字、英文队伍名称有概率无法正常OCR识别。

### ❓奖励识别没有结果？

奖励识别依赖领奖结果页的图标匹配和 OCR，请优先确认游戏分辨率为 `1920x1080`。如果仍然识别为空，可以开启「保存奖励识别截图」后重新运行，并根据 `log\RewardRecognition` 中的图片排查。
