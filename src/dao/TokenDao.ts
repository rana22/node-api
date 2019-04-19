import BaseDao = require("./base/BaseDao");
import {ITokenModel} from "../model/ITokenModel";
import TokenSchema = require("../schema/TokenSchema");
import {injectable} from "inversify";
import ITokenDao = require("./ITokenDao");

@injectable()
class TokenDao extends BaseDao<ITokenModel> implements ITokenDao {
    constructor () {
        super(TokenSchema);
    }
}

Object.seal(TokenDao);
export = TokenDao;