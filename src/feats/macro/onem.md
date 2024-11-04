---
title: 一键宏
order: 10
---

::: warning 分辨率

一键宏功能目前**只支持 `1920x1080` 分辨率**

0.29 版本开始支持全 `16:9` 分辨率

普通用户不建议不建议使用此功能！

:::

启用功能，并触发快捷键后会识别当前出战角色，并根据配置执行对应的宏。相当于软件宏，但是多了角色识别这一步。

由于是软件宏，所以有些事件间隔可能没法做到跟鼠标宏一样精确。

## 配置方式

每个角色的宏都配置在一个json文件中，每个角色至多5个宏配置，可以在设置中切换当前生效哪一组宏。

以下是部分配置举例：

```js
[
    {
        "name": "可莉",
        "scriptContent1": "keydown(w),wait(0.08),attack(0.05),keyup(w),wait(0.2)",
        "scriptContent2": "mousedown(left),mouseup(left),wait(0.09),charge(0.519),wait(0.09),charge(0.519),wait(0.09)"
    },
    {
        "name": "钟离",
        "scriptContent1": ""
    },
    {
        "name": "菲谢尔",
        "scriptContent1": "mousedown(left),wait(0.001),mouseup(left),wait(0.3),mousedown(left),wait(0.001),mouseup(left),wait(0.2),keydown(r),wait(0.02),keyup(r),wait(0.1),keydown(r),wait(0.02),keyup(r),wait(0.04)"
    }
]
```

所有的脚本语法都和[自动战斗脚本语法](/feats/task/domain.html#战斗策略脚本编写)一致，且推荐只使用[高级语法](/feats/task/domain.html#战斗策略脚本-高级语法)。
