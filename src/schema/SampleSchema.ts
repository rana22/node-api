import DataAccess = require("./DataAccess");
import Sequelize = require("sequelize");
import {ISampleInstance, ISampleModel} from "../model/ISampleModel";

var sequelize = DataAccess.sequelize;

class SampleSchema {

    static get schema() {
        return {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            detail: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            type: {
                type: Sequelize.STRING,
                allowNull: false
            },
            groundwaterLeeching: {
                type: Sequelize.STRING,
                allowNull: false
            },
            jobSiteId: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        };
    }

    static get config() {
        return {
            instanceMethods: {
                toJSON: function () {
                    var values = Object.assign({}, this.get());
                    values.$type = "Sample";
                    return values;
                }
            },
            timestamps: false
        }
    }

}

var schema = sequelize.define<ISampleInstance, ISampleModel>("sample", SampleSchema.schema, SampleSchema.config);

export = schema;