import {Model} from "sequelize";
import {IJobSiteModel, IJobSiteInstance} from "./IJobSiteModel";

interface JobSiteModel extends Model<IJobSiteInstance, IJobSiteModel> {

}

export = JobSiteModel;