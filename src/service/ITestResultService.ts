import IBaseService = require("./base/IBaseService");
import {ITestResultModel} from "../model/ITestResultModel";

interface ITestResultService extends IBaseService<ITestResultModel> {

}

export = ITestResultService;