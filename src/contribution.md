---
title: 贡献与开发
icon: handshake-simple
order: 50
---

开源项目离不开所有人的贡献，无论是代码、文档、还是有效反馈，都是对项目的贡献。

### 文档完善

当前文档仍不够完善，比如缺失《“快速开始”指南》、《首次运行排错方法》、《如何提问？》等内容，也存在使用说明不够详细、常见问题不够完整等问题。如果你有时间与想法，可以帮助我们完善文档。

如果你会使用 git，欢迎直接向[文档项目](https://github.com/huiyadanli/bettergi-docs)提交 PR。

如果你不会使用 git，也没关系，可以把写好的文档直接提交 [Issues](https://github.com/huiyadanli/bettergi-docs/issues) ，我们会帮你整理并更新至文档站。

### 功能开发

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

### 模型训练

BetterGI 当前是使用的 [YOLOv8](https://github.com/ultralytics/ultralytics) 作为目标检测算法。

目前有以下模型缺失训练集：

- 枫丹、须弥的鱼类
- 不同副本的石化古树

当前协作模式暂未确定...

### 如何编译并运行整个工程？

1. `git clone https://github.com/babalae/better-genshin-impact.git`
2. 需要使用 [Visual Studio 2022](https://visualstudio.microsoft.com/zh-hans/downloads/) 打开本项目。

#### 运行项目闪退？

可能是 Windows SDK 版本不够。使用 Visual Studio Installer 安装 `10.0.22621.0` 及以上版本的 Windows SDK，或者编辑项目文件的 `TargetFramework` 降低版本。
