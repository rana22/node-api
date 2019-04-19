import BaseDao = require("./base/BaseDao");
import {ITestResultInstance,ITestResultModel} from "../model/ITestResultModel";
import TestResultSchema = require("../schema/TestResultSchema");
import {injectable} from "inversify";
import ITestResultDao = require("./ITestResultDao");

@injectable()
class TestResultDao extends BaseDao<ITestResultModel> implements ITestResultDao {
    constructor() {
        super(TestResultSchema);
    }

    retrieve(): Promise<ITestResultModel[]> {
        return this._model.findAll({
            include : hierarchyDependencies
        });
    }

    findById (_id: number): Promise<ITestResultModel> {
        return this._model.findOne({
            where: {
                id: _id
            },
            include: hierarchyDependencies
        });
    }
}

let hierarchyDependencies: Object[] = [];

Object.seal(TestResultDao);
export = TestResultDao;