import IBaseDao = require("./base/IBaseDao");
import {IRoleInstance, IRoleModel} from "../model/IRoleModel";

interface IRoleDao extends IBaseDao<IRoleModel> {

}

export = IRoleDao;