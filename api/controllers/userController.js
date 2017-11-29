import UserService from "../services/UserService";

class UserController{
  constructor(){
    this.userService = new UserService();
  }

    getUserInfo(req , res){
        var userid = req.query.userid;
        this.userService.searchOneUser(userid,(err,data)=>{
          res.setHeader('Content-Type', 'application/json');
          res.send({
            userid:data._id,
            name:data.name
          });
      });
    }

    getUserInfoAsnyc(req , res){
        var userid = req.query.userid;
        this.userService.searchOneUserAsync(userid).then((data)=>{
          res.setHeader('Content-Type', 'application/json');
          res.send({data:data});
        },(err)=>{
          res.setHeader('Content-Type', 'application/json');
          res.send({name:"abc",error:err});
        });
    }
}

module.exports = new UserController();
