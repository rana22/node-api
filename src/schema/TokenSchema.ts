import DataAccess = require("./DataAccess");
import Sequelize = require("sequelize");
import {ITokenModel, ITokenInstance} from "../model/ITokenModel";

var sequelize = DataAccess.sequelize;

class TokenSchema {

    static get schema() {
        return {
            token: {
                type: Sequelize.STRING(1024)
            }
        };
    }

}

var schema = sequelize.define<ITokenInstance, ITokenModel>("token", TokenSchema.schema);

export = schema;
