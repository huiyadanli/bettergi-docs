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

**和配队配置一样，角色名称必须使用官方中文名称！**

脚本语法如下：

| 名称 | 方法 | 别名 | 参数 | 说明 | 示例 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| 元素战技 | skill | e | hold 代表长按，选填 | 触发键盘按下e键，并等待200ms。夜兰按两次e才能中断元素战技的释放。其中纳西妲长e会自动旋转。 | `skill`,`e`,`e(hold)` |
| 元素爆发 | burst | q |  | 触发键盘按下q键，至少会等待1.7秒，建议下一步动作为切换角色，保证元素爆发释放完成。 | `burst`,`q` |
| 普通攻击 | attack |  | 普攻持续时间(s)，选填 | 触发左键连击，每200ms触发一次左键单击 | `attack`,`attack(5.5)` |
| 重击 | charge |  | 长按的持续时间(s)，选填 | 长按左键。其中那维莱特重击会自动旋转。 | `charge`,`charge(6)` |
| 等待 | wait |  | 等待时间(s)，必填 | 程序等待 | `wait(0.5)` |
| 冲刺 | dash |  | 冲刺时间(s)，选填 | 朝当前方向冲刺 | `dash`,`dash(2)` |
| 跳跃 | jump | j |  | 跳跃一下 | `jump` |
| 行走 | walk |  | 1. 行走的方向，必填 2. 行走的时间(s)，必填 | 按下w/a/s/d行走 | `walk(w,0.2)` |
| 向前行走 | w |  | 行走的时间(s)，必填 | 按下w行走，等效于`walk(w,?)` | `w(0.2)` |
| 向左行走 | a |  | 行走的时间(s)，必填 | 按下a行走，等效于`walk(a,?)` | `a(0.2)` |
| 向后行走 | s |  | 行走的时间(s)，必填 | 按下s行走，等效于`walk(s,?)` | `s(0.2)` |
| 向右行走 | d |  | 行走的时间(s)，必填 | 按下d行走，等效于`walk(d,?)` | `d(0.2)` |

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
| 鼠标松开 | mouseup | 鼠标按键left、right、middle，选填，不填默认left | `mouseup(right)`,`mousedown`       |
| 鼠标单击 | click | 鼠标按键left、right、middle，选填，不填默认left | `click`,`click(middle)`            |
| 鼠标相对移动 | moveby | 1. X轴移动相对距离，向左转动为负数，向右为正数，必填。2. Y轴移动距离，向上转动为负数，向下为正数，必填 | `moveby(500,0)`,`moveby(100,-100)` |
| 键盘按下 | keydown | 键盘按下键的名称，必填，[按键代码](/feats/append/keycodes.html) | `keydown(A)`                       |
| 键盘松开 | keyup | 键盘松开键的名称，必填，[按键代码](/feats/append/keycodes.html) | `keyup(D)`                         |
| 键盘点按 | keypress | 键盘点按键的名称，必填，[按键代码](/feats/append/keycodes.html) | `keypress(F1)`                     |

示例:

* 在释放元素战技后，按下 F1 吃球后 ESC 退出： `e,wait(1),keypress(F1),wait(1),keypress(ESCAPE)`
* 胡桃12A重： `e,wait(0.3),charge(0.3),wait(0.1),dash,wait(0.1),charge(0.3),wait(0.1),dash,wait(0.1),charge(0.3),wait(0.1),j,wait(0.52),charge(0.3),wait(0.1),dash,wait(0.1),charge(0.3),wait(0.1),dash,wait(0.1),charge(0.3),wait(0.1),j,wait(0.52),charge(0.3),wait(0.1),dash,wait(0.1),charge(0.3),wait(0.1),dash,wait(0.1),charge(0.3),wait(0.1),j,wait(0.52),charge(0.3),wait(0.1),dash,wait(0.1),charge(0.3),wait(0.1),dash,wait(0.1),charge(0.3),wait(0.1),j,wait(5)`
* 滑步弓： `mousedown(left),wait(0.001),mouseup(left),wait(0.218),mousedown(left),wait(0.001),mouseup(left),wait(0.219),mousedown(left),wait(0.25),mouseup(left),wait(0.206)`
* 可莉走A：`keydown(w),wait(0.08),attack(0.05),keyup(w),wait(0.2)`


**感谢群友 `@爱司基模人` 编写并分享的大量战斗脚本。**

## 自动秘境

请站在秘境门口或者在进入秘境时候启动”自动秘境“功能，启动后自动刷本直到用光体力结束（OCR识别浓缩树脂数量的准确率不高，建议保留20以上的体力保证能够自动循环刷取，或者手动设置刷取次数）。当然也可以在设置中配置刷取次数。

![站在秘境门口启动（推荐）](https://img.alicdn.com/imgextra/i2/2042484851/O1CN016CLDxN1lhoELu85HD_!!2042484851.jpg_400x400)

![或在进入秘境时候启动（方便周日选材料）](https://img.alicdn.com/imgextra/i2/2042484851/O1CN01CXj1yP1lhoEfFHn0G_!!2042484851.jpg)

请保证进入前有背包有空间领取奖励，不然会卡死在领取奖励的过程中。

使用此功能前请确保自动战斗功能能够正常运行。

### 打不过秘境？

自动战斗在秘境对于练度是有一定要求的，且对盾角色（钟离）的依赖性很强，一个纯堆血量钟离必不可缺。自动秘境功能不建议新手（低命低练度）玩家使用。

### 石化古树无法识别？

如果截图模式用的是 `DwmGetDxSharedSurface`，切换到 `WindowsGraphicsCapture` 也许会解决问题。

当前训练集有限，只是训练一些高频刷取的本的石化古树（枫丹新本、绝缘、每个地区具有代表性的圣遗物本）。

如果出现无法识别到石化古树的现象，请联系作者补充训练集。

### 战斗结束后原地转圈？

原神设置中的“小地图锁定”，必须是“锁定方向”。“锁定玩家视角”会导致原地转圈

### 4k进入秘境后停留在秘境提示处没有反应？

已知bug，但是由于没有设备，暂时无法修复。可以尝试使用1080P窗口。

### 进入秘境后冲刺了以下不走了？

已知bug，换号后可能会出现此类情况，重启软件后就能恢复正常。

### 角色在场上长时间发呆，持续发出切人的声音

首先确认你完整阅读过 [快速上手](/quickstart.html) , 并且自动拾取能够正常使用。

造成这个情况的只有两个原因

1. 你开了游戏滤镜
2. 你的分辨率不是 16:9

### 自动秘境配置了队伍，但是切换失败

建议使用汉字命名队伍名称，短的数字、英文队伍名称有概率无法正常OCR识别。
