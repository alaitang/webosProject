import UserService from "../services/UserService";

class UserController{
  constructor(){
    this.userService = new UserService();
  }

    getUserInfo(userid,callBack){
      this.userService.searchOneUser(userid,callBack);
    }

    getUserInfoAsnyc(userid){

      return new Promise((resolve, reject)=>{

          //let result = this.userService.searchOneUserAsync(userid);
          //resolve("abc");
        this.userService.searchOneUserAsync(userid).then(resolve,reject);
      });
    }
}

module.exports = new UserController();
