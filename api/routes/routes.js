
var fs = require("fs");
var path = require('path');
var mongo = require('mongodb');
var pwd = "";
var connectionURL = "mongodb://alai:tangalai110@cluster0-shard-00-00-br3sc.mongodb.net:27017,cluster0-shard-00-01-br3sc.mongodb.net:27017,cluster0-shard-00-02-br3sc.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";

var UserController = require("../controllers/UserController");

class appRouter{
  constructor(app){
    app.get("/", function(req, res) {
        res.send("Hello World");
    });


    app.get("/user", function(req, res) {
      console.log(req.query);
      //var jsonPath = path.join(__dirname, '..', 'config', 'dev', 'foobar.json');
      var dataResult = {};

  var userid = req.query.userid;
  var folderid = req.query.folderid;

        try{

          var MongoClient = require('mongodb').MongoClient;

          MongoClient.connect(connectionURL, function(err, db) {
            if (err) throw err;
              db.collection("users").findOne({_id:new mongo.ObjectId(userid)}, function(err, result) {
              if (err) throw err;

                dataResult.id=result._id;
                dataResult.name=result.name;

                db.collection("folders").find({owner:result._id.toString(),parentFolderId:""}).toArray(function(err,rr){

                  dataResult.Desktop = rr.map((item)=>{
                    return {
                      id:item._id,
                      name:item.name,
                      type:"folder",
                      items:[],
                      key : item._id.toString()
                    }
                  });

                   res.setHeader('Content-Type', 'application/json');

                   res.send(dataResult);
                });

              db.close();
            });
          });

        }catch(ex){
          console.log(ex);
        }


    });




  /*****************/

    app.get("/userInfo", function(req, res) {
      console.log(UserController);

        var userid = req.query.userid;
        UserController.getUserInfoAsnyc(userid).then((result)=>{
          console.log(result);
          res.setHeader('Content-Type', 'application/json');
          res.send({name:"abc"});
        },(err)=>{
          console.log("something wrong");
          console.log(err);
          res.setHeader('Content-Type', 'application/json');
          res.send({name:"abc"});
        });
        /*
        UserController.getUserInfo(userid,(err, result)=>{
          console.log("coming call back");
          res.setHeader('Content-Type', 'application/json');
          res.send({});
      });
      */
    });
  }
}

module.exports = appRouter;
