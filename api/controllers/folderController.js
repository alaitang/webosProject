import FolderService from "../services/FolderService";

class FolderController{
  constructor(){
    this.folderService = new FolderService();
  }

  getFolderInfo(req, res){
    var userid = req.query.userid;
    var folderid = (req.query.folderid == null || req.query.folderid == undefined) ? "" : req.query.folderid;
    this.folderService.getFolders(userid,folderid,(err,data)=>{
      res.setHeader('Content-Type', 'application/json');
      res.send({data:data.map((item)=>{
        return {
          id:item._id,
          name:item.name,
          type:"folder",
          items:[],
          key : item._id.toString()
        }
      })});
    });
  }

  getFolderInfoAsnyc(req, res){
    var userid = req.query.userid;
    var folderid = (req.query.folderid == null || req.query.folderid == undefined) ? "" : req.query.folderid;
      this.folderService.getFoldersAsync(userid,folderid).then((data)=>{
        res.setHeader('Content-Type', 'application/json');
        res.send({data:data.map((item)=>{
          return {
            id:item._id,
            name:item.name,
            type:"folder",
            items:[],
            key : item._id.toString()
          }
        })});
      },(err)=>{
        res.setHeader('Content-Type', 'application/json');
        res.send({name:"abc",error:err});
      });
  }
}

module.exports = new FolderController();
