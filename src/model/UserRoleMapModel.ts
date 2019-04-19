import {Model} from "sequelize";
import {IUserRoleMapModel, IUserRoleMapInstance} from "./IUserRoleMapModel";

interface UserRoleMapModel extends Model<IUserRoleMapInstance, IUserRoleMapModel> {

}

export = UserRoleMapModel;