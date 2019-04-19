import {IPermissionModel} from "../model/IPermissionModel";
import {injectable,inject} from "inversify";
import BaseService = require("./base/BaseService");
import IPermissionDao = require("../dao/IPermissionDao");
import TYPES from "../config/Types";
import md5 = require("md5");
import PermissionDao = require("../dao/PermissionDao");
import IPermissionService = require("./IPermissionService");
var request = require('request-promise');

@injectable()
class PermissionService extends BaseService<IPermissionDao,IPermissionModel> implements IPermissionService {

    constructor (@inject(TYPES.IPermissionDao) dao: IPermissionDao) {
        super(dao);
    }


    getDistinctPermissionsByRole(_roleIdsArray: number[]): Promise<IPermissionModel[]> {
        return new Promise<IPermissionModel[]>((resolve, reject) => {
            this._dao.getDistinctPermissionsByRole(_roleIdsArray)
                .then((results) => {
                    if(results) {
                        resolve(results);
                    }else {
                        reject();
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

}

export = PermissionService;