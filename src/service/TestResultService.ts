import ITestResultService = require("./ITestResultService");
import {ITestResultModel} from "../model/ITestResultModel";
import {injectable,inject} from "inversify";
import BaseService = require("./base/BaseService");
import ITestResultDao = require("../dao/ITestResultDao");
import TYPES from "../config/Types";
import md5 = require("md5");
import {ITestResultInstance} from "../model/ITestResultModel";
var request = require('request-promise');

@injectable()
class TestResultService extends BaseService<ITestResultDao,ITestResultModel> implements ITestResultService {

    constructor (@inject(TYPES.ITestResultDao) dao: ITestResultDao) {
        super(dao);
    }

}

export = TestResultService;