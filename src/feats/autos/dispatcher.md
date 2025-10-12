---
title: 调度器
order: 1
---

::: warning 注意

使用调度器前请先在快捷键处配置 “停止当前脚本任务” 用于停止调度器的运行

:::

用于调度 [Javascript 脚本](/feats/autos/jsscript.html)、[自动寻路](/feats/autos/pathing.html)、[键鼠录制](/feats/autos/kmscript.html) 等功能与脚本。

所有配置组信息存储在软件根目录 `\User\ScriptGroup` 路径下，一个配置组对应一个 JSON。


调度器当前仍旧处于开发中状态。

### 1. 使用前准备
使用地图追踪功能之前请保证 `BetterGI` 版本大于 `0.42.0`，且`自动拾取`功能可用。原神 `设置`-`小地图锁定` 是 `锁定方向`，分辨率是  `16:9` 且大于等于 `1920x1080`，推荐使用 `1920x1080` 。

注：

1. 因为 原神 `5.4` 版本更新了部分 UI 位置，导致 `0.42.0` 之前版本无法使用地图追踪。


### 2. 获取脚本
#### 2.1 通过脚本仓库获取脚本

通过以下任意一种方式可以访问脚本仓库：

1. 使用内置仓库：在 `BetterGI` 中依次点击 `全自动` - `地图追踪` - `脚本仓库` 。

![调度器-1如何进入脚本仓库](https://github.com/user-attachments/assets/f04cf9e5-7adb-4789-9e36-6054be5977ec)

**第一次使用脚本仓库请先点击更新！**
**仓库不会自己更新！请手动点击更新按钮**

![调度器2-更新脚本仓库](https://github.com/user-attachments/assets/b64a7a40-d378-46a8-b7ed-95c3eec5c0b6)

更新完成后，再打开脚本仓库，如果下载失败，请点击重置（即删除脚本仓库）再次重试。

2. 使用在线仓库： 使用浏览器访问 [bgi.sh](https://bgi.sh/) 使用在线仓库。（备用地址：[https://s.bettergi.com/](https://s.bettergi.com/)）

3. 使用本地仓库：从用户社区获取本地仓库。（离线仓库相对在线仓库有滞后性，建议通过上述两种途径尝试失败之后尝试本方法）

在 `BetterGI` 依次点击 `设置`，找到手动导入本地脚本仓库（zip格式），点击右侧 `导入`。

![调度器-2 1脚本仓库本地导入](https://github.com/user-attachments/assets/0ab5fc2d-0357-4031-a84d-2bfd8a5109f6)

在弹出的界面选择 `本地仓库文件`，点击 `打开`。然后依次点击 `全自动` - `地图追踪` - `脚本仓库` 使用本地仓库。

![image](https://github.com/user-attachments/assets/baf93bff-ecb6-49c6-9295-a046dae7807c)


#### 2.2 订阅脚本
进入脚本仓库之后你将看到类似以下界面，中间红框部分是仓库刷新时间，请确保日期是最新的，如果不是，请返回开头更新脚本仓库。

![调度器-4脚本仓库更新时间](https://github.com/user-attachments/assets/6574b7d8-fde4-4af1-930c-3c06fdff73ba)

找到所需要的脚本，红框部分包含了所有种类的脚本，这里以地图追踪为例。点击右侧 订阅。（其他三种也是点击订阅即可下载）

![调度器-3脚本仓库介绍](https://github.com/user-attachments/assets/6c68677f-dc72-4a21-bdc9-79fe91efbfcc)

在弹出的界面点击 `确认导入`。如果是使用在线仓库，需要回到 `BetterGI` 主界面之后才会弹出此界面。

![image](https://github.com/user-attachments/assets/6e0f86ae-d0a3-4d39-9c3b-dcca4aee66a5)

此时 `BetterGI` 的 `全自动` - `地图追踪` - `脚本仓库` 出现你订阅的脚本，js与键鼠脚本同理。

![调度器-2 1脚本导入实例](https://github.com/user-attachments/assets/193ed6e5-5000-4db1-ab9f-ddae50b2a2b0)

