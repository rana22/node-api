import IBaseDao = require("./base/IBaseDao");
import {IJobSiteInstance, IJobSiteModel} from "../model/IJobSiteModel";

interface IJobSiteDao extends IBaseDao<IJobSiteModel> {

}

export = IJobSiteDao;