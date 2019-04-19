import IRoleService = require("./IRoleService");
import {IRoleModel} from "../model/IRoleModel";
import {injectable,inject} from "inversify";
import BaseService = require("./base/BaseService");
import IRoleDao = require("../dao/IRoleDao");
import TYPES from "../config/Types";
import md5 = require("md5");
import {IRoleInstance} from "../model/IRoleModel";
var request = require('request-promise');

@injectable()
class RoleService extends BaseService<IRoleDao,IRoleModel> implements IRoleService {

    constructor (@inject(TYPES.IRoleDao) dao: IRoleDao) {
        super(dao);
    }

    public createRole(item: IRoleModel, permissions: Array<number>): Promise<IRoleModel> {
        return new Promise<IRoleModel>((resolve, reject) => {
            let createdId: number;
            let roleCreated = this._dao.create(item);

            let setRolePermissions = roleCreated.then((results) => {
                createdId = results.id;
                let role = results as IRoleInstance;
                return role.addPermissions(permissions);
            }).catch((error) => {
                reject(error);
            });

            let getCreatedRole = setRolePermissions.then(() => {
                return this.findById(createdId);
            }).catch((error) => {
                reject(error);
            });

            getCreatedRole.then((role) => {
                let promises = [];

                Promise.all(promises)
                    .then(() => {
                        resolve(role as IRoleModel);
                        return null; //this is to handle runaway promise warning, see http://goo.gl/rRqMUw
                    })
                    .catch((error) => {
                        reject(error);
                    });
                return null; //this is to handle runaway promise warning, see http://goo.gl/rRqMUw
            });

        });
    }

    public updateRole(_id: number, item: IRoleModel, permissions: Array<number>): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            let isUpdated = super.update(_id, item);

            let foundUpdatedRole = isUpdated.then(() => {
                return this.findById(_id);
            }).catch((error) => {
                reject(error);
            });

            let permissionsAdded = foundUpdatedRole.then((results) => {
                let role = results as IRoleInstance;
                return role.setPermissions(permissions);
            }).catch((error) => {
                reject(error);
            });

            let haveUpdateRole = permissionsAdded.then(() => {
                return this.findById(_id);
            }).catch((error) => {
                reject(error);
            });

            haveUpdateRole.then((results) => {
                resolve(results);
            }).catch((error) => {
                reject(error);
            });

        });
    }

}

export = RoleService;