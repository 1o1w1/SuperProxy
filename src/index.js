#!/usr/bin/env node

var express = require("express");
var serveIndex = require("serve-index");
var path = require("path");
var app = express();

const [, , ...args] = process.argv;
console.log("hello world" + args);

var port = process.env.PORT || 9001; // set our port
//var staticdir = process.env.NODE_ENV === 'devbuild' ? 'build' : process.env.NODE_ENV === 'devdist'?'dist':'app'; // get static files dir
var staticdir = "";
console.log("[devServer] StaticDir:" + path.join(__dirname, staticdir));
// app.use(express.static(path.join(__dirname, staticdir)));

require("./proxy/routes")(app); // configure our routes

// app.use('/',serveIndex(path.join(__dirname, staticdir),{'icons': true}));

app.listen(port); // startup our app at http://localhost:8080
console.log("[devServer] Starting sever on port " + port); // shoutout to the user
exports = module.exports = app; // expose app
