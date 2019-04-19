import IBaseDao = require("./base/IBaseDao");
import {IUserInstance, IUserModel} from "../model/IUserModel";

interface IUserDao extends IBaseDao<IUserModel> {
    findByUsernamePassword(_username: string, _password: string) : Promise<IUserModel>;
    findByEmail(_email: string) : Promise<IUserModel>;
    findByResetToken(_resetPasswordToken: string) : Promise<IUserModel>;
}

export = IUserDao;