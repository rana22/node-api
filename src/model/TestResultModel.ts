import {Model} from "sequelize";
import {ITestResultModel, ITestResultInstance} from "./ITestResultModel";

interface TestResultModel extends Model<ITestResultInstance, ITestResultModel> {

}

export = TestResultModel;