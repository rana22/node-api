import {Instance} from "sequelize";

export interface IUserRoleMapModel {
    userId: number;
    roleId: number;
}

export interface IUserRoleMapInstance extends Instance<IUserRoleMapModel>, IUserRoleMapModel {

}