import ISampleService = require("./ISampleService");
import {ISampleModel} from "../model/ISampleModel";
import {injectable,inject} from "inversify";
import BaseService = require("./base/BaseService");
import ISampleDao = require("../dao/ISampleDao");
import TYPES from "../config/Types";
import md5 = require("md5");
import {ISampleInstance} from "../model/ISampleModel";
var request = require('request-promise');

@injectable()
class SampleService extends BaseService<ISampleDao,ISampleModel> implements ISampleService {

    constructor (@inject(TYPES.ISampleDao) dao: ISampleDao) {
        super(dao);
    }

}

export = SampleService;