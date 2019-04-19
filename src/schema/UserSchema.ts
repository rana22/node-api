import DataAccess = require("./DataAccess");
import Sequelize = require("sequelize");
import {IUserModel, IUserInstance} from "../model/IUserModel";
import TokenSchema = require("./TokenSchema");
import RoleSchema = require("./RoleSchema");
import UserRoleMapSchema = require("./UserRoleMapSchema");

var sequelize = DataAccess.sequelize;

class UserSchema {

    static get schema() {
        return {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            username: {
                type: Sequelize.STRING,
                unique: true
            },
            password: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING,
                unique: true
            },
            firstname: {
                type: Sequelize.STRING
            },
            lastname: {
                type: Sequelize.STRING
            },
            status: {
                type: Sequelize.STRING
            },
            resetPasswordToken: {
                type: Sequelize.STRING
            },
            resetPasswordExpires: {
                type: Sequelize.DATE
            }
        };
    }

    static get config() {
        return {
            instanceMethods: {
                toJSON: function () {
                    var values = Object.assign({}, this.get());
                    values.$type = "User";
                    delete values.password;
                    return values;
                },
                hasAccess: function() {
                    this.get().roles.forEach((role) => {
                        if(role.adminaccess) {
                            return true;
                        }
                    });
                    return false;
                }
            }
        }
    }

}

var schema = sequelize.define<IUserInstance, IUserModel>("user", UserSchema.schema, UserSchema.config);
schema.hasOne(TokenSchema);
schema.belongsToMany(RoleSchema, { through: UserRoleMapSchema});
RoleSchema.belongsToMany(schema, { through: UserRoleMapSchema});
schema.hasMany(UserRoleMapSchema, {as: "userRoleMap", foreignKey : 'userId'});  //this allows sending the map in the payload
schema.belongsToMany(RoleSchema, { through: 'user_roles' });
RoleSchema.belongsToMany(schema, { through: 'user_roles' });

export = schema;
