# 简介
my first npm


#  用法
 package.json中添加配置

  "lwq": {
    //save|local|proxy
    "mode": "local",
    "proxyTable": {
      "/pwap": {
        "target": "http://47.94.224.111:9017/",
        "pathRewrite": {
          "^/pwap": ""
        },
        "logLevel": "debug",
        "changeOrigin": true
      }
    }
  }


