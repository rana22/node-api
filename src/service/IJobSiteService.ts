import IBaseService = require("./base/IBaseService");
import {IJobSiteModel} from "../model/IJobSiteModel";

interface IJobSiteService extends IBaseService<IJobSiteModel> {

}

export = IJobSiteService;