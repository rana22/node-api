import Sequelize = require("sequelize");
import {Instance} from "sequelize";

export interface ITokenModel {
    token?: string;
    userId?: number;
}

export interface ITokenInstance extends Instance<ITokenModel>, ITokenModel {

}