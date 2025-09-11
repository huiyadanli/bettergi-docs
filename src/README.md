---
home: true
icon: home
title: 主页
heroImage: https://img.alicdn.com/imgextra/i3/2042484851/O1CN01BafDLu1lhoP3xOqGQ_!!2042484851.png
bgImageStyle:
  background-attachment: fixed
heroText: BetterGI · 更好的原神
tagline: BetterGI ， 一个开源且免费，基于计算机视觉技术，意图让原神变的更好的项目。
actions:
  - text: 下载
    icon: circle-down
    link: ./download
    type: primary

  - text: 文档
    link: ./doc

highlights:
  - header: 特性与自动化功能列表
    description: 大概是最简单好用、功能最繁多的原神自动化工具了。<a href="/feat.html#已有功能列表">更多功能添加中...</a>
    image: /assets/image/box.svg
    bgImageStyle:
      background-repeat: repeat
      background-size: initial
    features:
      - title: 遮罩窗口
        icon: masks-theater
        details: 自带一个遮罩窗口覆盖在游戏界面上，显示日志和识别结果
        link: 

      - title: 多种图像捕获方式
        icon: camera-retro
        details: 支持GDI、DXGI等方式捕获游戏图像，支持云原神
        link: 

      - title: AI模型
        icon: robot
        details: 集成 ONNXRuntime，YOLOv8识别、多种OCR引擎等

      - title: 图形化界面
        icon: gamepad
        details: 全图形化界面操作，简单易用且可以自定义快捷键
        link: 

      - title: 自动拾取
        icon: hand-sparkles
        details: 基于 Yap 识别，可自定义黑白名单的拾取功能，不会误对话NPC
        link: /feats/timer/pick.html

      - title: 自动剧情
        icon: forward
        details: 快速跳过文本，自动选择对话选项，跳过黑屏，关闭书页显示等
        link: /feats/timer/skip.html

      - title: 每日委托奖励
        icon: gift
        details: 对话凯瑟琳时，如果有『每日委托』奖励，会自动领取
        link: /feats/timer/skip.html#自动领取『每日委托』奖励

      - title: 自动重新派遣
        icon: magnifying-glass-dollar
        details: 自动领取探索派遣奖励并重新派遣。
        link: /feats/timer/skip.html#%E8%87%AA%E5%8A%A8%E9%87%8D%E6%96%B0%E6%B4%BE%E9%81%A3

      - title: AI全自动钓鱼
        icon: fish-fins
        details: 自动切换鱼饵、抛竿、提竿、拉条，你只需要挂机即可
        link: /feats/timer/fish.html

      - title: 自动七圣召唤
        icon: dice
        details: 支持角色邀请、每周来客、部分大世界挑战等，可自定义卡组
        link: /feats/task/tcg.html

      - title: 操控辅助
        icon: file-code
        details: 类似宏的操作，按键连发、那维莱特转圈圈等
        link: /feats/macro/other.html

      - title: 圣遗物一键强化
        icon: hammer
        details: 圣遗物一键强化，快速跳过强化结果
        link: /feats/macro/other.html#%E5%9C%A3%E9%81%97%E7%89%A9%E4%B8%80%E9%94%AE%E5%BC%BA%E5%8C%96
    
      - title: 快速传送
        icon: location-dot
        details: 地图上点击传送点后，自动点选传送
        link: /feats/timer/tp.html

      - title: 自动伐木
        icon: tree
        details: 装备「王树瑞佑」后，自动挂机伐木
        link: /feats/task/felling.html

      - title: 自动战斗
        icon: hand-fist
        details: 识别配队并按照自定义战斗策略进行自动战斗
        link: /feats/task/domain.html

      - title: 自动秘境
        icon: chess-knight
        details: 基于钟离的全自动刷本功能，依赖于自动战斗
        link: /feats/task/domain.html

      - title: 一键宏
        icon: scroll
        details: 按下快捷键识别角色并触发对应的宏配置
        link: /feats/macro/onem.html

      - title: 自动烹饪
        icon: bowl-rice
        details: 自动在完美区域完成食物烹饪
        link: /feats/timer/cook.html

      - title: 地图追踪
        icon: map-location
        details: 基于小地图的地图追踪功能，可以实现自动采集、锄地等
        link: /feats/autos/pathing.html

      - title: 键鼠录制脚本
        icon: keyboard
        details: 录制与回放键盘鼠标脚本
        link: /feats/autos/kmscript.html
copyright: false
footer: 使用 <a href="https://theme-hope.vuejs.press/zh/" target="_blank">VuePress Theme Hope</a> 主题强力驱动
