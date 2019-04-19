import {Model} from "sequelize";
import {ISampleModel, ISampleInstance} from "./ISampleModel";

interface SampleModel extends Model<ISampleInstance, ISampleModel> {

}

export = SampleModel;