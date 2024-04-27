---
title: 贡献、开发、AI
icon: handshake-simple
order: 50
---

开源项目离不开所有人的贡献，无论是代码、文档、还是有效反馈，都是对项目的贡献。

### 📝 文档完善

当前文档仍不够完善，比如缺失《首次运行排错方法》、《如何提问？》等内容，也存在使用说明不够详细、常见问题不够完整等问题。如果你有时间与想法，可以帮助我们完善文档。

如果你会使用 git，欢迎直接向[文档项目](https://github.com/huiyadanli/bettergi-docs)提交 PR。

如果你不会使用 git，也没关系，可以把写好的文档直接提交 [Issues](https://github.com/huiyadanli/bettergi-docs/issues) ，我们会帮你整理并更新至文档站。

### 💎 功能开发

BetterGI 当前处于快速开发迭代阶段，有大量[Issue](https://github.com/babalae/better-genshin-impact/issues)需要处理（功能、BUG修复）等。

如果你是C#开发者，欢迎直接参与界面与核心功能的开发。

其他有CV经验的开发者可以参与视觉算法的开发，或者提供更好的实现思路，编程语言不是问题。

#### 可以参与的功能点

* UI 界面优化
  * 自动拾取的黑白名单UI与交互
  * 启动页的账号切换交互，原神（国服、国际服）启动配置。（有代码和交互参考）
  * 通用设置页的开发：给定一个JSON，能够渲染一个配置列表，支持配置文本、开关、快捷键等。
  * 自定义脚本录制保存与加载界面
* 功能开发
  * 直接参考已有的独立、实时任务实现方式实现更多的任务。当前程序已经内置了OCR、图像识别、模拟操作等基础能力包装，组装这些能力实现完整功能即可。需要开发的功能可以看[Issue](https://github.com/babalae/better-genshin-impact/issues)和[计划实现的功能](/feat.html)
  * 宏录制和重放

#### 如何编译并运行整个工程？

1. `git clone https://github.com/babalae/better-genshin-impact.git`
2. 需要使用 [Visual Studio 2022](https://visualstudio.microsoft.com/zh-hans/downloads/) 打开本项目。

##### 运行项目闪退？

可能是 Windows SDK 版本不够。使用 Visual Studio Installer 安装 `10.0.22621.0` 及以上版本的 Windows SDK，或者编辑项目文件的 `TargetFramework` 降低版本。

### 🍬 模型训练

BetterGI 当前大部分是使用的 [YOLOv8](https://github.com/ultralytics/ultralytics) 作为目标检测、分类算法。

未来会依据用途添加更多合适的算法。比如咬钩分类暂时就是一个简化的神经网络。

如果你有一定的计算机基础，且有兴趣参与数据收集、清洗、打标，或者是算法优化，可以加入AI模型训练群：[863012276](http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=5MykSb0YDHtpU3QdJI7XDR-sbbdrqgZH&authKey=a8jOzCEnYilPZDPJV84OJnOSXw3z3xe8Jv6P5hj6f5Jq9V4TkB9V0sFWQDJe6nJK&noverify=0&group_code=863012276) 。 （入群请注明来意，定期会清理潜水人员）

群内有很多原神相关的 idea 和训练素材。

#### 训练教程

- [YOLOv8目标检测：不写一行代码，完成原神钓鱼AI训练与识别](https://www.bilibili.com/video/BV16x4y1y7K1/)

#### 现有模型

- 鱼类模型仍在积极训练中~
  当前有多种任务，都是基于HutaoFisher的原神钓鱼相关的AI训练
    1. 鱼本身的数据集采集整理以及分类打标
    2. 抛竿时鱼饵落点数据采集整理以及分类打标
    3. 一个咬钩分类器任务：找到比当前咬钩判断更好的分类器算法，内附示例数据集，要求解决语言必须为Python
- 石化古树识别模型
    1. 需要在草神大招遮盖下，且已经通关的副本的截图

#### 大作业

这是一些已经可以确认能够训练并有实践意义的大作业（也许可以水过大学某些课程的大作业），具体训练集、图像素材、作业要求与指引请加群获取。

要求语言基本都是 Python 实现

* ~~[简单] 角色头像分类任务（已完成）~~
    * 资源：原神全角色的正面证件头像、侧面头像的半透明图，文件名内有角色名称
    * 通过这些资源自动生成数据集并增强
    * 训练分类器
* [中等] 咬钩分类器任务
    * 资源：鱼类咬钩已打标好的数据
    * 要求自行选择实现算法
* [简单] 原神E技能是否进入CD任务
    * 资源：全角色E技能半透明图像，原神字体资源
    * 要求必须是二分类的算法
