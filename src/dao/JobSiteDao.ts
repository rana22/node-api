import BaseDao = require("./base/BaseDao");
import {IJobSiteInstance,IJobSiteModel} from "../model/IJobSiteModel";
import JobSiteSchema = require("../schema/JobSiteSchema");
import {injectable} from "inversify";
import IJobSiteDao = require("./IJobSiteDao");
import SampleSchema = require("../schema/SampleSchema");

@injectable()
class JobSiteDao extends BaseDao<IJobSiteModel> implements IJobSiteDao {
    constructor() {
        super(JobSiteSchema);
    }

    retrieve(): Promise<IJobSiteModel[]> {
        return this._model.findAll({
            include : hierarchyDependencies
        });
    }

    findById (_id: number): Promise<IJobSiteModel> {
        return this._model.findOne({
            where: {
                id: _id
            },
            include: hierarchyDependencies
        });
    }
}

let hierarchyDependencies: Object[] = [
    {
        model: SampleSchema,
        as: "samples"
    }
];

Object.seal(JobSiteDao);
export = JobSiteDao;