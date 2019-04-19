import IBaseService = require("./base/IBaseService");
import {ISampleModel} from "../model/ISampleModel";

interface ISampleService extends IBaseService<ISampleModel> {

}

export = ISampleService;