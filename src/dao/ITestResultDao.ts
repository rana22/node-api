import IBaseDao = require("./base/IBaseDao");
import {ITestResultInstance, ITestResultModel} from "../model/ITestResultModel";

interface ITestResultDao extends IBaseDao<ITestResultModel> {

}

export = ITestResultDao;