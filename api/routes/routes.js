
var fs = require("fs");
var path = require('path');
var mongo = require('mongodb');
var pwd = "";
var connectionURL = "mongodb://alai:tangalai110@cluster0-shard-00-00-br3sc.mongodb.net:27017,cluster0-shard-00-01-br3sc.mongodb.net:27017,cluster0-shard-00-02-br3sc.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";
var appRouter = function(app) {
  app.get("/", function(req, res) {
      res.send("Hello World");
  });


  app.get("/user", function(req, res) {

    //var jsonPath = path.join(__dirname, '..', 'config', 'dev', 'foobar.json');
    var dataResult = {};

      try{

        var MongoClient = require('mongodb').MongoClient;

        MongoClient.connect(connectionURL, function(err, db) {
          if (err) throw err;
            db.collection("users").findOne({}, function(err, result) {
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

    //var jsonPath = path.join(__dirname, '..', 'config', 'dev', 'foobar.json');
    var dataResult = {};
    fs.readFile("./api/Data/user.json", 'utf8', function (err, data) {

       res.setHeader('Content-Type', 'application/json');
       let result = JSON.parse(data);
       //console.log(typeof result);
       res.send(result.data[0]);
   });

  });
}

module.exports = appRouter;
