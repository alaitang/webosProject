import BaseService from "./BaseService";

class FolderService extends BaseService{

  getCollectionName(){
    return "folders";
  }

  getFolders(userid,folderid,callBack){
    return super.searchMany({parentFolderId:folderid,owner:userid},userid,callBack);
  }

  getFoldersAsync(userid,folderid){
    return new Promise((resolve, reject)=>{
      super.searchManyAsnyc({parentFolderId:folderid,owner:userid},userid).then(resolve,reject);
    });
  }

}
export default FolderService;
