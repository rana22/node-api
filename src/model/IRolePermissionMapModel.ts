import {Instance} from "sequelize";

export interface IRolePermissionMapModel {
    roleId: number;
    permissionId: number;
}

export interface IRolePermissionMapInstance extends Instance<IRolePermissionMapModel>, IRolePermissionMapModel {

}