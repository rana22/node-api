import * as Sequelize from "sequelize";
import {Instance} from "sequelize";

export interface ITestResultModel {
    id?: number;
    benzenePPM?: number, 
    toluenePPM?: number;
    ethylPPM?: number;
    xylenePPM?: number;
    sampleId?: number;

}

export interface ITestResultInstance extends Instance<ITestResultModel>, ITestResultModel {

}