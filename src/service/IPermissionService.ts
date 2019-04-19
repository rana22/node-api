import IBaseService = require("./base/IBaseService");
import { IPermissionModel } from "../model/IPermissionModel";

interface IPermissionService extends IBaseService<IPermissionModel> {
    getDistinctPermissionsByRole(_roleIdsArray: number[]): Promise<IPermissionModel[]>;
}

export = IPermissionService;