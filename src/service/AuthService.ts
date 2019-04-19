import IAuthService = require("./IAuthService");
import {ITokenModel} from "../model/ITokenModel";
import {injectable,inject} from "inversify";
import BaseService = require("./base/BaseService");
import ITokenDao = require("../dao/ITokenDao");
import TYPES from "../config/Types";

@injectable()
class AuthService extends BaseService<ITokenDao,ITokenModel> implements IAuthService {

    constructor (@inject(TYPES.ITokenDao) dao: ITokenDao) {
        super(dao);
    }

}

export = AuthService;