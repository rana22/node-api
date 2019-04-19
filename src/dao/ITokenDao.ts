import IBaseDao = require("./base/IBaseDao");
import {ITokenModel} from "../model/ITokenModel";

interface ITokenDao extends IBaseDao<ITokenModel> {

}

export = ITokenDao;