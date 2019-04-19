import BaseDao = require("./base/BaseDao");
import {IUserInstance, IUserModel} from "../model/IUserModel";
import UserSchema = require("../schema/UserSchema");
import RoleSchema = require("../schema/RoleSchema");
import {injectable} from "inversify";
import IUserDao = require("./IUserDao");
import UserRoleMapSchema = require("../schema/UserRoleMapSchema");

@injectable()
class UserDao extends BaseDao<IUserModel> implements IUserDao {
    constructor () {
        super(UserSchema);
    }

    create(item: IUserModel): Promise<IUserModel> {
        return this._model.create(item, {
            include: []
        });
    }

    retrieve(): Promise<IUserModel[]> {
        return this._model.findAll({
            include: hierarchyDependencies
        });
    }

    findById (_id: number): Promise<IUserModel> {
        return this._model.findOne({
            where: {
                id: _id
            },
            include: hierarchyDependencies
        });
    }

    findByUsernamePassword (_username: string, _password: string): Promise<IUserModel> {
        return this._model.findOne({
            where: {
                username: _username,
                password: _password
            },
            include: hierarchyDependencies
        });
    }

    findByEmail (_email: string): Promise<IUserModel> {
        return this._model.findOne({
            where: {
                email: _email
            }
        });
    }

    findByResetToken (_resetPasswordToken: string): Promise<IUserModel> {
        return this._model.findOne({
            where: {
                resetPasswordToken: _resetPasswordToken
            }
        });
    }
}

let hierarchyDependencies: Object[] = [
    {
        model: RoleSchema
    },
    {
        model: UserRoleMapSchema,
        as: "userRoleMap"
    }
];

Object.seal(UserDao);
export = UserDao;