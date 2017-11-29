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
}
export default UserService;
