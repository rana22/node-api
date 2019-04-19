import * as Sequelize from "sequelize";
import {Instance} from "sequelize";
import {IPermissionInstance, IPermissionModel} from "./IPermissionModel";

export interface IRoleModel {
    id?: number;
    type: string;
    adminaccess: boolean;

    permissions?: IPermissionModel[];
}

export interface IRoleInstance extends Instance<IRoleModel>, IRoleModel {
    addPermissions: Sequelize.BelongsToManyAddAssociationsMixin<IPermissionInstance, number, {}>;
    addPermission: Sequelize.BelongsToManyAddAssociationMixin<IPermissionInstance, number, {}>;
    setPermissions: Sequelize.BelongsToManySetAssociationsMixin<IPermissionInstance, number, {}>;
}