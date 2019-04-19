import {Instance} from "sequelize";

export interface ISampleModel {
    id?: number;
    name: string;
    detail: string;
    type: string;
    groundwaterLeeching: string;
    jobSiteId: number;

}

export interface ISampleInstance extends Instance<ISampleModel>, ISampleModel {

}