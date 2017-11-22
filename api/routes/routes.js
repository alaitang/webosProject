
var fs = require("fs");
var path = require('path');

var appRouter = function(app) {
  app.get("/", function(req, res) {
      res.send("Hello World");
  });
  app.get("/user", function(req, res) {

    //var jsonPath = path.join(__dirname, '..', 'config', 'dev', 'foobar.json');
    fs.readFile("./api/Data/user.json", 'utf8', function (err, data) {


      /*
       data = JSON.parse( data );
       data["user4"] = user["user4"];
       */
       var accountMock = {
           "username": "nraboy",
           "password": "1234",
           "twitter": "@nraboy"
       }
       console.log( err );

       res.setHeader('Content-Type', 'application/json');
       res.send(data);
   });
/*
    var accountMock = {
        "username": "nraboy",
        "password": "1234",
        "twitter": "@nraboy"
    }
    if(!req.query.username) {
        return res.send({"status": "error", "message": "missing username"});
    } else if(req.query.username != accountMock.username) {
        return res.send({"status": "error", "message": "wrong username"});
    } else {
        return res.send(accountMock);
    }
    */
  });
}

module.exports = appRouter;
