---
title: HTTP请求
order: 50
---

## HTTP请求 http

HTTP请求功能，支持GET、POST等常用HTTP方法，并包含权限控制机制。

### 权限配置

使用HTTP功能需要在以下位置进行配置：

1. **调度器通用设置**：启用"JS HTTP权限"
2. **脚本manifest.json**：配置允许请求的URL列表

```json
{
  "http_allowed_urls": [
    "https://api.example.com/*",
    "https://*.github.com/*"
  ]
}
```

### 基本用法

```js
// 发送GET请求
const response = await http.request("GET", "https://api.example.com/data");

// 发送POST请求
const response = await http.request("POST", "https://api.example.com/submit", 
  JSON.stringify({name: "test"}), 
  JSON.stringify({"Content-Type": "application/json"})
);
```

## 方法

### request(method, url, body?, headersJson?)

- 返回类型: `HttpReponse`
- 描述: 执行HTTP请求
- 参数:
  - `method` (`string`): HTTP方法，如"GET"、"POST"、"PUT"、"DELETE"等
  - `url` (`string`): 请求URL
  - `body` (`string?`): 请求体，可选
  - `headersJson` (`string?`): 请求头JSON字符串，可选

### HttpReponse 对象

HTTP响应对象，包含以下属性：

#### status_code
- 类型: `int`
- 描述: HTTP状态码

#### headers
- 类型: `Dictionary<string, string>`
- 描述: 响应头字典

#### body
- 类型: `string`
- 描述: 响应体内容

## 完整示例

```js
(async function() {
  try {
    // GET请求示例
    const getResponse = await http.request("GET", "https://api.github.com/user");
    log.info(`状态码: ${getResponse.status_code}`);
    log.info(`响应内容: ${getResponse.body}`);
    
    // POST请求示例
    const postData = JSON.stringify({
      name: "测试用户",
      email: "test@example.com"
    });
    
    const headers = JSON.stringify({
      "Content-Type": "application/json",
      "User-Agent": "BetterGI-Script/1.0"
    });
    
    const postResponse = await http.request("POST", "https://api.example.com/users", postData, headers);
    
    if (postResponse.status_code === 200) {
      log.info("请求成功");
      const responseData = JSON.parse(postResponse.body);
      log.info(`用户ID: ${responseData.id}`);
    } else {
      log.error(`请求失败，状态码: ${postResponse.status_code}`);
    }
    
  } catch (error) {
    if (error.message.includes("不允许请求此URL")) {
      log.error("URL不在允许列表中，请检查manifest.json配置");
    } else if (error.message.includes("JS HTTP权限")) {
      log.error("请在调度器通用设置中启用JS HTTP权限");
    } else {
      log.error(`HTTP请求失败: ${error.message}`);
    }
  }
})();
```

## 注意事项

1. **权限控制**：所有HTTP请求都需要在manifest.json中配置允许的URL
2. **URL匹配**：支持通配符匹配，如`https://*.example.com/*`
3. **请求头**：所有请求头都会被转换为小写
4. **错误处理**：建议使用try-catch处理可能的权限错误
5. **安全性**：只允许访问配置的URL，防止恶意请求
