import BaseDao = require("./base/BaseDao");
import {IRoleModel} from "../model/IRoleModel";
import RoleSchema = require("../schema/RoleSchema");
import UserRoleMapSchema = require("../schema/UserRoleMapSchema");
import UserSchema = require("../schema/UserSchema");
import {injectable} from "inversify";
import IRoleDao = require("./IRoleDao");
import RolePermissionSchema = require("../schema/RolePermissionMapSchema");

@injectable()
class RoleDao extends BaseDao<IRoleModel> implements IRoleDao {
    constructor () {
        super(RoleSchema);
    }

    retrieve(): Promise<IRoleModel[]> {
        return this._model.findAll({
            include: hierarchyDependencies
        });
    }

    findById (_id: number): Promise<IRoleModel> {
        return this._model.findOne({
            where: {
                id: _id
            },
            include: hierarchyDependencies
        });
    }
}

let hierarchyDependencies: Object[] = [
    {
        model: UserRoleMapSchema,
        as: "userRoleMap"
    },
    {
        model: RolePermissionSchema,
        as: "rolePermissionMap"
    }
];



Object.seal(RoleDao);
export = RoleDao;