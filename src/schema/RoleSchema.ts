import DataAccess = require("./DataAccess");
import Sequelize = require("sequelize");
import {IRoleModel, IRoleInstance} from "../model/IRoleModel";
import UserSchema = require("./UserSchema");
import PermissionSchema = require("./PermissionSchema");
import UserRoleMapSchema = require("./UserRoleMapSchema");
import RolePermissionMapSchema = require("./RolePermissionMapSchema");

var sequelize = DataAccess.sequelize;

class RoleSchema {

    static get schema() {
        return {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            type: {
                type: Sequelize.STRING,
                allowNull: false
            },
            adminaccess: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            }
        };
    }

    static get config() {
        return {
            instanceMethods: {
                toJSON: function () {
                    var values = Object.assign({}, this.get());
                    values.$type = "Role";
                    delete values.user_roles;
                    return values;
                }
            },
            timestamps: false
        }
    }

}

var schema = sequelize.define<IRoleInstance, IRoleModel>("role", RoleSchema.schema, RoleSchema.config);

schema.belongsToMany(PermissionSchema, { through: RolePermissionMapSchema});
PermissionSchema.belongsToMany(schema, { through: RolePermissionMapSchema});
schema.belongsToMany(PermissionSchema, { through: 'role_permissions' });
PermissionSchema.belongsToMany(schema, { through: 'role_permissions' });

//Allow for sending the maps in the payload
schema.hasMany(UserRoleMapSchema, {as: "userRoleMap", foreignKey : 'roleid'});
schema.hasMany(RolePermissionMapSchema, {as: "rolePermissionMap", foreignKey : 'roleid'});

export = schema;
