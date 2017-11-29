
import mongo,{MongoClient} from 'mongodb';

class BaseService{

  getCollectionName(){
    return "";
  }

  getConnectionUrl(){
    var connectionURL = "mongodb://alai:tangalai110@cluster0-shard-00-00-br3sc.mongodb.net:27017,cluster0-shard-00-01-br3sc.mongodb.net:27017,cluster0-shard-00-02-br3sc.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";
    return connectionURL;
  }

  searchMany(query,userid,callBack){

  }

  searchOne(id,userid,callBack){
      MongoClient.connect(this.getConnectionUrl(),(err, db)=>{
        db.collection(this.getCollectionName()).findOne({_id:new mongo.ObjectId(id)}).then(callBack);
      });
  }

  searchOneAsnyc(id,userid){

    return new Promise((resolve, reject)=>{

      MongoClient.connect(this.getConnectionUrl()).then((db)=>{
        db.collection(this.getCollectionName()).findOne({})
        .then((data)=>{
          resolve(data);
        },(err)=>{
          reject();
        });
      },(err)=>{
          reject();
      });

    });
/*
    return new Promise((resolve, reject)=>{
        this.getConnection().then((err, db)=>{
          db.collection(this.getCollectionName()).findOne({_id:new mongo.ObjectId(id)}).then((err,result)=>
              {
                if (err) {
                  reject(err);
                } else {
                    resolve(db);
                }
            }
          );
        });
    });
    */
  }

  create(item,userid,callBack){

  }

  update(item,userid,callBack){

  }

  remove(item,userid,callBack){

  }


  getConnection(){
        return new Promise((resolve, reject)=>{
            // Use connect method to connect to the Server
            MongoClient.connect(this.getConnectionUrl(), (err, db) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(db);
                }
            });
        });
  }
/*
  fun(){

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
  }
  */

}

export default BaseService;
