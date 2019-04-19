import {Model} from "sequelize";
import {IUserModel, IUserInstance} from "./IUserModel";

interface UserModel extends Model<IUserInstance, IUserModel> {

}

export = UserModel;