var path = require("path");
var util = require("util");
var fs = require("fs");
var proxyMiddleware = require("http-proxy-middleware");
// var proxyConfig = require('./proxy');

const cwd = process.cwd();
// var appPath = path.resolve(__dirname,'../static');
var jsonPath = path.join(cwd, "./superproxy");
var packagePath = path.join(cwd, "./package.json");
let packageJsonBuffer;
try {
  packageJsonBuffer = fs.readFileSync(packagePath, "utf-8");
} catch (error) {
  console.log("无配置文件!");
  // packageJsonBuffer = require('./config.js')
}

var packageJson = JSON.parse(packageJsonBuffer).superproxy;
var proxyTable = packageJson.proxyTable;

module.exports = function(app) {
  if (packageJson.mode == "local") {
    app.use(proxyLocalJson());
  } else {
    Object.keys(proxyTable).forEach(function(context) {
      var options = proxyTable[context];
      if (typeof options === "string") {
        options = { target: options };
      }
      options.logLevel = options.logLevel || "debug";
      if (packageJson.mode == "save") {
        //保存json
        options.onProxyRes = function(proxyRes, req, res) {
          recordProxyJson(proxyRes, req, res, context, options);
        };
      }
      app.use(proxyMiddleware(options.filter || context, options));
    });
  }
};

function proxyLocalJson(options) {
  return function(req, res, next) {
    var url = req.url;
    // if (/^\/local/.test(url)) {
    var localJson = url.replace(/.?\/(.*?)$/, "$1.json");

    console.log("proxyLocalJson:" + url + "===>" + localJson);
    fs.readFile(path.join(jsonPath, localJson), "utf-8", function(err, result) {
      let Origin, AccessControlRequestHeaders;
      req.rawHeaders.forEach((element, i) => {
        if (element === "Origin") {
          Origin = req.rawHeaders[i + 1];
        }
        if (element === "Access-Control-Request-Headers") {
          AccessControlRequestHeaders = req.rawHeaders[i + 1];
        }
      });

      res.set("Content-Type", "application/json;charset=UTF-8");
      res.set("Access-Control-Allow-Origin", Origin);
      res.set("Access-Control-Allow-Credentials", true);
      res.set("Access-Control-Allow-Methods", "*");
      res.set("Access-Control-Allow-Headers", AccessControlRequestHeaders);
      // res.set("Access-Control-Allow-Headers", "*");
      res.set("Access-Control-Expose-Headers", "*");
      if (err) {
        console.log(err);
        res.status(404).end();
      } else {
        res.send(result);
      }
    });
    // } else {
    // 	next();
    // }
  };
}

function recordProxyJson(proxyRes, req, res, context, options) {
  if (/application\/json/i.test(proxyRes.headers["content-type"])) {
    var body = "";
    proxyRes.on("data", function(data) {
      data = data.toString("utf-8");
      body += data;
    });
    proxyRes.on("end", function() {
      try {
        var bodyObj = JSON.parse(body);

        // if (bodyObj["_RejCode"] === "000000") {//成功返回,保存json
        if (bodyObj["success"] != false) {
          //成功返回,保存json
          // var _context = context.replace(/\//g, '');
          // var reg = new RegExp("\\/" + _context + "\\/(.*?)\\.do(\\?.*)?$");
          // eval("var reg = /\\/" + _context + "\\/(.*?)\\.do(\\?.*)?$/;"); //可以,这里不使用?，下面使用的话怕IDE报错...\
          // var localJson = req.originalUrl.replace(reg, '$1.json');

          // var pathReg = new RegExp( "(.*)\/.*?\.json");
          var localJson = req.originalUrl.replace(
            new RegExp("/(.*?)$"),
            "$1.json"
          );

          // if (localJson.indexOf('/')<0) {
          //     localJson = ''
          // }

          fs.mkdirSync(
            jsonPath + "/" + req.originalUrl,
            { recursive: true },
            err => {
              if (err) throw err;
            }
          );
          //序列化成字符串写入文件
          fs.writeFile(
            jsonPath + "/" + localJson,
            JSON.stringify(bodyObj, null, 2),
            function(err) {
              if (err) {
                console.log("[saveJson] " + err);
              } else {
                console.log(
                  "[saveJson] writeFile " +
                    localJson +
                    " success at " +
                    jsonPath
                );
              }
            }
          );
        }
      } catch (e) {
        console.log(e);
      }
    });
  }
}
