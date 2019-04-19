import IBaseService = require("./base/IBaseService");
import {IUserInstance, IUserModel} from "../model/IUserModel";

interface IUserService extends IBaseService<IUserModel> {
    authenticateUser(_username: string, _password: string) : Promise<IUserModel>;
    updateUser(_id: number, item: IUserModel, roles: Array<number>) : Promise<any>;
    createUser(item: IUserModel, roles: Array<number>) : Promise<IUserModel>;
    forgotPassword(_email: string, _path: string) : Promise<any>;
    findUserWithResetToken(_resetPasswordToken: string) : Promise<any>;
    updateUserPassword(_id: number, _resetPasswordToken: string, _password: string) : Promise<any>;
}

export = IUserService;