import IJobSiteService = require("./IJobSiteService");
import {IJobSiteModel} from "../model/IJobSiteModel";
import {injectable,inject} from "inversify";
import BaseService = require("./base/BaseService");
import IJobSiteDao = require("../dao/IJobSiteDao");
import TYPES from "../config/Types";
import md5 = require("md5");
import {IJobSiteInstance} from "../model/IJobSiteModel";
var request = require('request-promise');

@injectable()
class JobSiteService extends BaseService<IJobSiteDao,IJobSiteModel> implements IJobSiteService {

    constructor (@inject(TYPES.IJobSiteDao) dao: IJobSiteDao) {
        super(dao);
    }

}

export = JobSiteService;