---
title: 脚本提交方式
icon: handshake-simple
order: 110
---

# 纯网页端 PR 教程

谁都能看懂的 GitHub Pull Request 使用指南 (\*´▽ ｀)ノノ
用于BGI中央仓库提交你的脚本，并提交给 BGI 的开发者进行审核，合并到 BGI脚本 的主仓库中。

::: warning
本教程中对很多概念进行了简化，为了让更多朋友能实际用起来，甚至有一些很不优雅~~但是简单~~的操作，还有一些不那么正确的解释，还请大佬们轻喷。
若您有一定的 git 使用经验及编程基础，~~那你还看个 🔨~~，可以看稍微进阶一点的教程(暂时没有，等等吧）  
:::
本文参考了 [maa网页端pr教程](https://maa.plus/docs/zh-cn/develop/pr-tutorial.html)  
感谢由maa提供的pr教程，感谢！

## 基本概念及名词解释

这一章节内容略微枯燥，不感兴趣可以直接跳过到下面实操部分，有不理解的再回来看

### Repository（仓库）

简称 repo，存放我们代码及其他资源文件的地方

👇 可以简单理解为当前这个网页及里面所有的内容，就是 BGI脚本 的仓库（我们一般称之为BGI脚本的中央仓库）
![img.png](assets/pr/img.png)

### Fork（复制）

复制，字面意思，将 BGI 的代码复制一份，然后可以进行后续修改等等的操作，避免把原来的弄坏了

但一般说中文“复制”我们可能首先想到的是 copy 的意思，fork 也没有其他明确的翻译，所以我们一般习惯直接说英文，比如“把代码 fork 一份走”

既然是复制后的，那就是 `BGI (1)`（bushi）
![img.png](assets/pr/fork.png)
为了和原本的仓库区分开，所以我们一般将原本的 BGI脚本 仓库称为 “主仓库”、“upstream（上游仓库）”

因为每个人都可以自己复制一份走，所以复制后的称之为“个人仓库”，“origin（原仓库）”，这是fork到自己仓库后的页面

![img.png](assets/pr/ifork.png)

### Pull Request（拉取请求、合并请求）

简称 PR，“拉取请求”这个太直译了，听起来很奇怪，~~而且字太多了打起来太累~~，所以也是一样的大家一般就直接说：“来个 PR”

书接上文，你 fork（复制）的个人仓库，修改完了，怎么把内容提供给主仓库呢？这时候我们就可以开一个 PR，申请将自己修改的内容加入到主仓库中。

当然啦，既然是“请求”，那自然是需要审批的，BGI脚本 Team 的各位可能会针对你的修改提一些意见等，当然我们的意见也不一定完全正确，大家合理讨论~

👇 下面的是 PR页面

![img.png](assets/pr/pr1.png)

### Conflict（冲突）

假设一下，主仓库中有个 A 文件，它的内容是 111

你 fork 了一份，将其内容改成了 222，但是你刚准备提交 PR，这时候张三也 fork 了一份并提交了 PR，并将 A 文件改成了 333

这时候我们就会看到，你俩都修改了 A 文件，并且修改的不同，那听谁的好呢？这就是 Conflict（冲突）

冲突解决起来比较麻烦，这里仅阐述概念，方便实际遇到时能理解发生了什么，暂不阐述解决方案

## 纯网页端 PR 操作全流程

1. 👇 首先进入BGI脚本主仓库，点右上角这个按钮 Fork 一份代码  
   [BGI中央仓库](https://github.com/babalae/bettergi-scripts-list)

![fork.png](assets/pr/fork.png)

2. 然后直接点击 Create Fork  
3. 稍等片刻，接下来来到了你的个人仓库，可以看到标题是 “你的github名字/bettergi-scripts-list”，下面一行小字 forked from babalae/bettergi-scripts-list （复制自 BGI脚本 主仓库）

![img_1.png](assets/pr/forkend.png)

4. 现在可以愉快的提交你的脚本了

::: warning特别注意
你所提交的脚本文件必须符合相应的类型

combat代表战斗脚本

js代表js脚本

pathing代表路径追踪

tcg代表七圣召唤脚本

如果脚本文件类型确认完毕，请继续往下阅读
:::

* （1）.点击你 fork 的仓库中的repo文件夹，根据你所需要的提交的文件，选择相应的文件夹。
* （2）.此处以提交战斗脚本为例，点击combat文件夹，点击Add file -> Upload files，将你的脚本文件上传到combat文件夹中。
  ![img.png](assets/pr/add.png)
  ![img.png](assets/pr/upload.png)
* (3).点击choose your files，选择你的脚本文件，点击 Commit changes，提交你的脚本文件。提交完成后，会跳转到一个仓库页面。
  ![img.png](assets/pr/choose.png)
* (4).此时点击Contribute，再点 Open Pull Request，进入到 PR 页面。
  ![img.png](assets/pr/openpr.png)
* (5).在 PR 页面，填写 PR 的标题和描述，然后点击 Create Pull Request，提交你的 PR。
  ![img.png](assets/pr/crteatepr.png)
* (6).若提交成功了，会跳转到一个 PR 页面，此时你的脚本被提交到主仓库供审核。
  ![img.png](assets/pr/gopr.png)

5. 还有第二个文件要改的？改完了发现弄错了想再改改？都没关系！重复步骤 4. 中的1-6即可！
   你也可以删除你所提交的pr
   点击 Close pull request，关闭 PR即可。
   ![img.png](assets/pr/closepr.png)
6. 如果大佬们说要再修改一些小问题的话，回到 **你的个人仓库**，修改文件即可！
   注意不需要操作步骤 1-2（重新 fork）和步骤4的全部内容（重新 Pull Request），你当前的 Pull Request 仍处于待审核状态，后续的修改会直接进入到这个 Pull Request 中
7. 等大佬们审批通过，pr页面出现紫色的Merged，就全部完成了，你修改的内容已经进入 BGI脚本 中央仓库啦！
   ![img.png](assets/pr/merged.png)
8. 下次如果还想提别的 PR，请先回到你的个人仓库的主页，点击 Sync fork，让你的仓库和主仓库同步。
   这里注意啦，如果有一个红色的 Discard 1 commit，那就点红色的这个；如果没有，再点绿色的 Update branch。
   接下来就可以重复4的步骤再次修改啦
   ![img.png](assets/pr/repr.png)
   在**脚本发布后**，你的 GitHub 头像将会自动进入到贡献者列表名单中，非常感谢各位的无私奉献！

::: tip 贡献/参与者
感谢所有参与到脚本开发中的朋友们，是大家的帮助让BGI越来越好！ (\*´▽ ｀)ノノ

[![Contributors](https://contributors-img.web.app/image?repo=babalae/bettergi-scripts-list&max=100&columns=15)](https://github.com/babalae/bettergi-scripts-list/graphs/contributors)
:::

