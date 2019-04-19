import BaseDao = require("./base/BaseDao");
import {IPermissionModel} from "../model/IPermissionModel";
import RoleSchema = require("../schema/RoleSchema");
import UserRoleMapSchema = require("../schema/UserRoleMapSchema");
import UserSchema = require("../schema/UserSchema");
import PermissionSchema = require("../schema/PermissionSchema");
import {injectable} from "inversify";
import IPermissionDao = require("./IPermissionDao");
import RolePermissionSchema = require("../schema/RolePermissionMapSchema");

@injectable()
class PermissionDao extends BaseDao<IPermissionModel> implements IPermissionDao {

    constructor () {
        super(PermissionSchema);
    }

    retrieve(): Promise<IPermissionModel[]> {
        return this._model.findAll({
            include: hierarchyDependencies
        });
    }

    findById (_id: number): Promise<IPermissionModel> {
        return this._model.findOne({
            where: {
                id: _id
            },
            include: hierarchyDependencies
        });
    }

    getDistinctPermissionsByRole(_roleIdsArray: number[]): Promise<IPermissionModel[]> {
        let distinctHierarchy: Object[] = [
            {
                model: RoleSchema,
                as: "roles",
                where: {
                    id: {
                        $in: _roleIdsArray
                    }
                }
            }
        ];
        return this._model.findAll({
            include: distinctHierarchy
        });
    }

}

let hierarchyDependencies: Object[] = [];



Object.seal(PermissionDao);
export = PermissionDao;