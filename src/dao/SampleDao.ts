import BaseDao = require("./base/BaseDao");
import {ISampleInstance,ISampleModel} from "../model/ISampleModel";
import SampleSchema = require("../schema/SampleSchema");
import {injectable} from "inversify";
import ISampleDao = require("./ISampleDao");

@injectable()
class SampleDao extends BaseDao<ISampleModel> implements ISampleDao {
    constructor() {
        super(SampleSchema);
    }

    retrieve(): Promise<ISampleModel[]> {
        return this._model.findAll({
            include : hierarchyDependencies
        });
    }

    findById (_id: number): Promise<ISampleModel> {
        return this._model.findOne({
            where: {
                id: _id
            },
            include: hierarchyDependencies
        });
    }
}

let hierarchyDependencies: Object[] = [];

Object.seal(SampleDao);
export = SampleDao;