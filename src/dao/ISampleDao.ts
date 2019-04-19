import IBaseDao = require("./base/IBaseDao");
import {ISampleInstance, ISampleModel} from "../model/ISampleModel";

interface ISampleDao extends IBaseDao<ISampleModel> {

}

export = ISampleDao;