---
title: 分解圣遗物
order: 60
---

这个功能可能只能在 `16:9` 的分辨率下才能够正常使用！

这个任务由以下两部分组成：

### 快速分解

自动点击快速分解

将在快速分解的末尾点击确认分解，因此如果你有想要收藏的低星圣遗物，请先将其锁定再启动快速分解任务

[自动秘境](/feats/task/domain.html)中也会调用快速分解，可以选择是否开启

原神5.5版本对快速分解圣遗物的界面逻辑做了改动，请确保你使用了`0.44.6`以后的最新版本

### 按匹配规则的圣遗物分解（通常用于五星圣遗物）

**先启动截图器，然后启动分解圣遗物**，启动后程序会自动逐行点击圣遗物并对右侧的属性卡片进行文字识别，进而筛选出满足匹配规则的圣遗物

匹配规则是由运行JavaScript确定的。

JavaScript接受`ArtifactStat`作为入参；必须对`Output`赋值一个布尔值作为返回，`true`代表匹配成功否则失败  

#### ArtifactStat类结构：  
└─ Properties  
    ├─ `Name` : `String` 名称  
    ├─ `MainAffix` : `Affix` 主词缀  
    ├─ `MinorAffixes` : `Affix[]` 副词缀数组  
    └─ `Level` : `Number` 等级  

#### Affix类结构：  
└─ Properties  
    ├─ `Type` : `String` 词缀类型  
    └─ `Value` : `Number` 词缀值  

#### Affix的Type：  
| 值 | 含义 |
|---------|---------|
| ATK | 攻击力 |
| ATKPercent | 攻击力（百分比） |
| DEF | 防御力 |
| DEFPercent | 防御力（百分比） |
| HP | 生命值 |
| HPPercent | 生命值（百分比） |
| CRITRate | 暴击率 |
| CRITDMG | 暴击伤害 |
| ElementalMastery | 元素精通 |
| EnergyRecharge | 元素充能效率 |
| HealingBonus | 治疗加成 |
| PhysicalDMGBonus | 物理伤害加成 |
| PyroDMGBonus | 火元素伤害加成 |
| HydroDMGBonus | 水元素伤害加成 |
| DendroDMGBonus | 草元素伤害加成 |
| ElectroDMGBonus | 雷元素伤害加成 |
| AnemoDMGBonus | 风元素伤害加成 |
| CryoDMGBonus | 冰元素伤害加成 |
| GeoDMGBonus | 岩元素伤害加成 |

举个例子，以下JS可以匹配副词条中既有“攻击力+数字”，又有“防御力+数字”属性的圣遗物：
```js
    var hasATK = Array.from(ArtifactStat.MinorAffixes).some(affix => affix.Type == 'ATK');
    var hasDEF = Array.from(ArtifactStat.MinorAffixes).some(affix => affix.Type == 'DEF');
    Output = hasATK && hasDEF;
```

### 关于按套装筛选

逐行扫描之前，通过利用游戏自带的筛选套装，来提高扫描效率。  

由于利用了图标识别，你需要填入圣遗物套装图标所对应的物品名称，通常是套装内的生之花名称。比如你想筛选“黄金乐团”套装，就填入“黄金乐曲的变奏”。支持的套装图标对应物品详见[原型特征清单](https://github.com/babalae/bettergi-libraries/blob/main/BetterGI.Assets.Model/Assets/Model/Item/items.csv)

如果你想同时筛选多套，就填入多个名称，目前使用的规则是“包含”，只要这个参数值包含识别出的套装图标名，就可以生效。

### 关于测试窗口

在原神中打开分解圣遗物界面，再打开测试窗口，就能看到圣遗物右侧的属性卡片的文字识别效果和JavaScript匹配结果

可以在测试窗口看到目前能从属性卡片上OCR识别到所有信息

如果你想测试匹配规则是否正确，这是个很便捷的测试手段

### 关于最大检查数量

逐行扫描时，会首先忽略那些已经被上锁的圣遗物

如果你积累了很多很多圣遗物，你可以设定最大检查数量，这样在扫描一定数量后会中止扫描

### 关于扫描完成

扫描筛选完成后，保险起见并不会自动点击分解，这时你可以使用游戏内自带的筛选“已选择”，来看到并复查被筛选出的圣遗物，如果确认无误，请手动点击确认分解


### 演示

待补充
