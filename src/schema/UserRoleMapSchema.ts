import DataAccess = require("./DataAccess");
import Sequelize = require("sequelize");
import {IUserRoleMapModel, IUserRoleMapInstance} from "../model/IUserRoleMapModel";
import TokenSchema = require("./TokenSchema");
import RoleSchema = require("./RoleSchema");

var sequelize = DataAccess.sequelize;

class UserRoleMapSchema {

    static get schema() {
        return {
            userId: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            roleid: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            created: {
                type: Sequelize.DATE
            },
            updated: {
                type: Sequelize.DATE
            }
        };
    }

    static get config() {
        return {
            instanceMethods: {
                toJSON: function () {
                    var values = Object.assign({}, this.get());
                    values.$type = "UserRoleMap";
                    delete values.password;
                    return values;
                }
            }
        }
    }

}

var schema = sequelize.define<IUserRoleMapInstance, IUserRoleMapModel>("user_roles", UserRoleMapSchema.schema, UserRoleMapSchema.config);



export = schema;
