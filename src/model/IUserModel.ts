import * as Sequelize from "sequelize";
import {Instance} from "sequelize";
import {ITokenInstance, ITokenModel} from "./ITokenModel";
import {IRoleInstance, IRoleModel} from "./IRoleModel";

export interface IUserModel {
    id?: number;
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    status?: string;

    roles?: IRoleModel[];

    resetPasswordToken?: string;
    resetPasswordExpires?: string;
}

export interface IUserInstance extends Instance<IUserModel>, IUserModel {
    getToken: Sequelize.HasOneGetAssociationMixin<ITokenInstance>;
    setToken: Sequelize.HasOneSetAssociationMixin<ITokenInstance, number>;
    createToken: Sequelize.HasOneCreateAssociationMixin<ITokenModel>;
    addRoles: Sequelize.BelongsToManyAddAssociationsMixin<IRoleInstance, number, {}>;
    addRole: Sequelize.BelongsToManyAddAssociationMixin<IRoleInstance, number, {}>;
    setRoles: Sequelize.BelongsToManySetAssociationsMixin<IRoleInstance, number, {}>;
}