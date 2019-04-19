import IBaseDao = require("./base/IBaseDao");
import {IPermissionInstance, IPermissionModel} from "../model/IPermissionModel";

interface IPermissionDao extends IBaseDao<IPermissionModel> {
    getDistinctPermissionsByRole(_roleIdsArray: number[]): Promise<IPermissionModel[]>;
}

export = IPermissionDao;