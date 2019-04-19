import IBaseService = require("./base/IBaseService");
import { IRoleModel } from "../model/IRoleModel";

interface IRoleService extends IBaseService<IRoleModel> {
    createRole(item: IRoleModel, permissions: Array<number>) : Promise<IRoleModel>;
    updateRole(_id: number, item: IRoleModel, permissions: Array<number>) : Promise<any>;
}

export = IRoleService;