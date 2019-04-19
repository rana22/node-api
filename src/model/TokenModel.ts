import {Model} from "sequelize";
import {ITokenModel, ITokenInstance} from "./ITokenModel";

interface TokenModel extends Model<ITokenInstance, ITokenModel> {

}

export = TokenModel;