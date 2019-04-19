import {Model} from "sequelize";
import {IPermissionInstance, IPermissionModel} from "./IPermissionModel";

interface PermissionModel extends Model<IPermissionInstance, IPermissionModel> {

}

export = PermissionModel;