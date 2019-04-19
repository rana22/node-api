import DataAccess = require("./DataAccess");
import Sequelize = require("sequelize");
import {IPermissionInstance, IPermissionModel} from "../model/IPermissionModel";
import UserSchema = require("./RoleSchema");
import RolePermissionMapSchema = require("./RolePermissionMapSchema");

var sequelize = DataAccess.sequelize;

class PermissionSchema {

    static get schema() {
        return {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            url: {
                type: Sequelize.STRING,
                allowNull: false
            },
            path: {
                type: Sequelize.STRING,
                allowNull: false
            },
            method: {
                type: Sequelize.STRING,
                allowNull: false
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false
            }
        };
    }

    static get config() {
        return {
            instanceMethods: {
                toJSON: function () {
                    var values = Object.assign({}, this.get());
                    values.$type = "Permission";
                    delete values.role_permissions;
                    return values;
                }
            },
            timestamps: false
        }
    }

}

var schema = sequelize.define<IPermissionInstance, IPermissionModel>("permission", PermissionSchema.schema, PermissionSchema.config);
schema.hasMany(RolePermissionMapSchema, {as: "rolePermissionMap", foreignKey : 'permissionid'});  //this allows sending the map in the payload

export = schema;