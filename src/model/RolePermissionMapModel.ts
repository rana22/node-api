import {Model} from "sequelize";
import {IRolePermissionMapModel, IRolePermissionMapInstance} from "./IRolePermissionMapModel";

interface RolePermissionMapModel extends Model<IRolePermissionMapInstance, IRolePermissionMapModel> {

}

export = RolePermissionMapModel;