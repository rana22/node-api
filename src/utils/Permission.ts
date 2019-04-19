import {injectable,inject} from "inversify";
import TYPES from "../config/Types";
import Http = require("passport-http");
import IAuthService = require("../service/IAuthService");
import IUserService = require("../service/IUserService");
import IPermissionService = require("../service/IPermissionService");
import * as express from 'express';

@injectable()
class Permission {

    @inject(TYPES.IPermissionService) private _permissionService: IPermissionService;

    init() {

    }

    checkUserPermission(url,path,method, user): Promise<boolean>{
        let hasPermission = false;
        let roleIdArray = user.get().roles.map(function (role) {
            return role.id;
        });
        return new Promise((resolve) => {
            this._permissionService.getDistinctPermissionsByRole(roleIdArray).then(function (permissionEntities) {
                hasPermission = permissionEntities.some(function (permission) {
                    return (permission.url == url && permission.method == method && permission.path == path);
                });
                resolve(hasPermission);
            });
        });
    }

}

Object.seal(Permission);
export = Permission;