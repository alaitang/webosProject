
var fs = require("fs");
var path = require('path');
var mongo = require('mongodb');
var pwd = "";
var connectionURL = "mongodb://alai:tangalai110@cluster0-shard-00-00-br3sc.mongodb.net:27017,cluster0-shard-00-01-br3sc.mongodb.net:27017,cluster0-shard-00-02-br3sc.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";

var UserController = require("../controllers/UserController");
var FolderController = require("../controllers/FolderController");

class appRouter{
  constructor(app){
    app.get("/", function(req, res) {
        res.send("Hello World");
    });

    app.get("/Folder", function(req, res) {
        FolderController.getFolderInfo(req, res);
    });

    app.get("/UserInfo", function(req, res) {
          UserController.getUserInfo(req, res);
    });
  }
}

module.exports = appRouter;
