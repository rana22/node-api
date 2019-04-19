import DataAccess = require("./DataAccess");
import Sequelize = require("sequelize");
import {IRolePermissionMapModel, IRolePermissionMapInstance} from "../model/IRolePermissionMapModel";
import TokenSchema = require("./TokenSchema");
import RoleSchema = require("./RoleSchema");

var sequelize = DataAccess.sequelize;

class RolePermissionMapSchema {

    static get schema() {
        return {
            roleid: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            permissionid: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            created: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: Sequelize.NOW
            },
            updated: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: Sequelize.NOW
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: Sequelize.NOW
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: Sequelize.NOW
            },
        };
    }

    static get config() {
        return {
            instanceMethods: {
                toJSON: function () {
                    var values = Object.assign({}, this.get());
                    values.$type = "RolePermissionMap";
                    delete values.password;
                    return values;
                }
            }
        }
    }

}

var schema = sequelize.define<IRolePermissionMapInstance, IRolePermissionMapModel>("role_permissions", RolePermissionMapSchema.schema, RolePermissionMapSchema.config);

export = schema;
