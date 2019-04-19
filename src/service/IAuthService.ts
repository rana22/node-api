import IBaseService = require("./base/IBaseService");
import {ITokenModel} from "../model/ITokenModel";

interface IAuthService extends IBaseService<ITokenModel> {

}

export = IAuthService;