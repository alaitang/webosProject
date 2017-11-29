import BaseService from "./BaseService";

class UserService extends BaseService{

  getCollectionName(){
    return "users";
  }

  searchOneUser(userid,callBack){
    return super.searchOne(userid,userid,callBack);
  }

  searchOneUserAsync(userid){
    return new Promise((resolve, reject)=>{
      super.searchOneAsnyc(userid,userid).then(resolve,reject);
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
export default UserService;
