import DataAccess = require("./DataAccess");
import Sequelize = require("sequelize");
import {ITestResultModel, ITestResultInstance} from "../model/ITestResultModel";

var sequelize = DataAccess.sequelize;

class TestResultSchema {

    static get schema() {
        return {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            benzenePPM: {
                type: Sequelize.FLOAT
            },
            toluenePPM: {
                type: Sequelize.FLOAT
            },
            ethylBenzenePPM:{
                type: Sequelize.FLOAT
            },
            xylenePPM:{
                type: Sequelize.FLOAT
            },
            sampleId:{
                type: Sequelize.INTEGER
            }


        };
    }

    static get config() {
        return {
            instanceMethods: {
                toJSON: function () {
                    var values = Object.assign({}, this.get());
                    values.$type = "TestResult";
                    return values;
                }
            },
            timestamps: false
        }
    }

}

var schema = sequelize.define<ITestResultInstance, ITestResultModel>("testresult", TestResultSchema.schema, TestResultSchema.config);

export = schema;
