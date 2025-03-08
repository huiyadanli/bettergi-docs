---
title: 贡献、开发、AI
order: 10
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

#### 如何编译并运行整个工程？

##### Visual Studio 2022
1. `git clone https://github.com/babalae/better-genshin-impact.git`
2. 需要使用 [Visual Studio 2022](https://visualstudio.microsoft.com/zh-hans/downloads/) 打开本项目。

##### Rider (推荐)
1. `git clone https://github.com/babalae/better-genshin-impact.git`
2. 推荐使用 [Rider](https://www.jetbrains.com/zh-cn/rider/) 打开本项目。速度快且免费！

请注意当前 `/Asset` 目录下的部分文件过大，比如地图特征数据（300M+），需要手动从 Release 包中获取并拷贝至对应的编译目录下，软件才能够正常运行对应的功能。（当前仅影响地图追踪、自动传送相关功能）

##### 运行项目闪退？

可能是 Windows SDK 版本不够。使用 Visual Studio Installer 安装 `10.0.22621.0` 及以上版本的 Windows SDK，或者编辑项目文件的 `TargetFramework` 降低版本。

### 🍬 模型训练

BetterGI 当前大部分是使用的 [YOLOv8](https://github.com/ultralytics/ultralytics) 作为目标检测、分类算法。

未来会依据用途添加更多合适的算法。比如咬钩分类暂时就是一个简化的神经网络。

如果你有一定的计算机基础，且有兴趣参与数据收集、清洗、打标，或者是算法优化，可以加入AI模型训练群：[863012276](http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=5MykSb0YDHtpU3QdJI7XDR-sbbdrqgZH&authKey=a8jOzCEnYilPZDPJV84OJnOSXw3z3xe8Jv6P5hj6f5Jq9V4TkB9V0sFWQDJe6nJK&noverify=0&group_code=863012276) 。 （纯干活群，定期会清理潜水人员）

群内有很多原神相关的 idea 和训练素材。

#### 训练教程

- [YOLOv8目标检测：不写一行代码，完成原神钓鱼AI训练与识别](https://www.bilibili.com/video/BV16x4y1y7K1/)
