import {Instance, Model} from "sequelize";

export interface IPermissionModel {
    id?: number;
    url: string;
    path: string;
    method: string;
    title: string;
    description: string;
}

export interface IPermissionInstance extends Instance<IPermissionModel>, IPermissionModel {

}