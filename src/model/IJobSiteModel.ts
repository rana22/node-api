import {Instance} from "sequelize";
import {ISampleModel} from "./ISampleModel";

export interface IJobSiteModel {
    id?: number;
    name: string;
    description: string;
    samples?: ISampleModel[];

}

export interface IJobSiteInstance extends Instance<IJobSiteModel>, IJobSiteModel {

}