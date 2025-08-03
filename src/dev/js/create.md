---
title: 创建脚本
order: 10
---

## 基本项目配置

每个JS脚本都是一个文件夹，文件夹内必须要有一个脚本描述文件 `manifest.json` 和一个入口程序文件 `*.js`。

脚本的配置可以通过一个 JSON 配置文件进行 UI 渲染，然后用户可以修改配置并执行脚本。

项目内所有文件编码必须是 `UTF-8` 。

### manifest.json

```json
{
  "manifest_version": 1,
  "name": "传送并自动秘境", // 名称
  "version": "1.0", // 版本
  "bgi_version": "0.36.1", // 适用于 BetterGI 的最低版本，BetterGI低于此版本会提示
  "description": "BetterGI自带脚本，用于传送后并执行自动秘境", // 描述
  // 作者信息
  "authors": [
    {
      "name": "huiyadanli",
      "link": "https://github.com/huiyadanli"
    }
  ],
  // 自定义配置
  "settings_ui": "settings.json",
  // 入口文件
  "main": "main.js",
  // 需要保留的文件路径（支持正则表达式与通配符）
  "saved_files": [
    "data/*.txt",
    "user_data.txt"
  ]
}
```

还有一些不常用的属性：

```
  // 可以导入文件夹下的其他js类库，只支持 CommonJS
  // 参考： https://github.com/microsoft/ClearScript/blob/master/ClearScriptTest/V8ModuleTest.cs 内的 js 写法。
  "library": ['src']
```

### main.js

```js
(async function () {
    // 所有的代码必须由 async function 包裹
})();
```

### settings.json

用于在 BetterGI 的调度器中配置变量

```js
[
  {
    "name": "selectValue", // 变量名，在js内使用 settings.变量名 获取对应的配置值
    "type": "select", // 类型
    "label": "选项框", // 显示标签
    "options": [ //选项
      "选项一",
      "选项二"
    ]
  },
  {
    "name": "inputValue",
    "type": "input-text",
    "label": "文本框"
  },
  {
    "name": "checkValue",
    "type": "checkbox",
    "label": "复选框"
  }
]
```
