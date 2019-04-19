import {Model} from "sequelize";
import {IRoleModel, IRoleInstance} from "./IRoleModel";

interface RoleModel extends Model<IRoleInstance, IRoleModel> {

}

export = RoleModel;