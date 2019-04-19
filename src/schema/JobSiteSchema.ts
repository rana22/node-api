import DataAccess = require("./DataAccess");
import Sequelize = require("sequelize");
import {IJobSiteInstance, IJobSiteModel} from "../model/IJobSiteModel";
import SampleSchema = require("./SampleSchema");

var sequelize = DataAccess.sequelize;

class JobSiteSchema {

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
            description: {
                type: Sequelize.TEXT,
                allowNull: false
            }
        };
    }

    static get config() {
        return {
            instanceMethods: {
                toJSON: function () {
                    var values = Object.assign({}, this.get());
                    values.$type = "JobSite";
                    return values;
                }
            },
            timestamps: false
        }
    }

}

var schema = sequelize.define<IJobSiteInstance, IJobSiteModel>("jobSite", JobSiteSchema.schema, JobSiteSchema.config);
schema.hasMany(SampleSchema, {as: "samples", foreignKey: "jobSiteId"});

export = schema;