// module.exports = {
//     // saveJson:false,//是否保存服务端json数据,注意只记录rejecode===000000的json数据,默认关闭
// 	enable: true, //激活远程代理
// 	enableLocal: true, //激活本地JSON代理到_public/data目录
// 	proxyTable: {
// 		// "/vxapi":"http://127.0.0.1:8088/", //转发时，不改变交易上下文的情况（推荐使用此方式，避免Session丢失），如http://127.0.0.1:8080/pweb/resource.do ===>http://196.168.1.1:8000/pweb/resource.do
// 		// "/pmobile":{
// 		// // 	// target:"http://10.197.9.125:8084/",  //转发时，改变交易上下文的情况，如http://127.0.0.1:8080/pmobile/resource.do ===>http://196.168.1.2:8000/resource.do
// 		// 	target:"http://10.197.9.192:8081/",//祝渊
// 		// 	// target:"http://10.197.9.151:8088/",//胡权			
// 		// 	pathRewrite: {'^/pmobile' : ''},
// 		// 	logLevel: 'debug'
// 		// },
// 		"/pwap":{
// 			// target:"http://10.197.9.125:8084",  //转发时，改变交易上下文的情况，如http://127.0.0.1:8080/pmobile/resource.do ===>http://196.168.1.2:8000/resource.do
// 			target:"http://47.94.224.111:9017/",
// 			// target:"http://10.197.9.151:8088/",//胡权
// 			pathRewrite: {'^/pwap' : ''},
// 			logLevel: 'debug',
// 			changeOrigin: true,
// 		},
		




		
// 	}
// };



module.exports = {
	"superproxy":{
		"//'save'|'local'|'proxy'":"",
		"mode":"local",
		"proxyTable":{
		  "/pwap":{
			"target":"http://47.94.224.111:9017/",
			"pathRewrite": {"^/pwap" : ""},
			"logLevel": "debug",
			"changeOrigin": true
		  }
		}
	   
	  }
}

