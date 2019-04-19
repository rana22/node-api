import {ContainerModule, interfaces} from "inversify";
import Bind = interfaces.Bind;
import TYPES from "../config/Types";
import UserDao = require("./UserDao");
import IUserDao = require("./IUserDao");
import TokenDao = require("./TokenDao");
import ITokenDao = require("./ITokenDao");
import IPermissionDao = require("./IPermissionDao");
import PermissionDao = require("./PermissionDao");
import IRoleDao = require("./IRoleDao");
import RoleDao = require("./RoleDao");
import TestResultDao = require("./TestResultDao");
import ITestResultDao = require("./ITestResultDao");
/* INSERT IMPORTS */
import JobSiteDao = require("./JobSiteDao");
import IJobSiteDao = require("./IJobSiteDao");
import SampleDao = require("./SampleDao");
import ISampleDao = require("./ISampleDao");

class DataAccessModule {

    static get config () {
        return new ContainerModule((bind: Bind) => {
            bind<IUserDao>(TYPES.IUserDao).to(UserDao).inSingletonScope();
            bind<ITokenDao>(TYPES.ITokenDao).to(TokenDao).inSingletonScope();
            bind<IPermissionDao>(TYPES.IPermissionDao).to(PermissionDao).inSingletonScope();
            bind<IRoleDao>(TYPES.IRoleDao).to(RoleDao).inSingletonScope();
			bind<ITestResultDao>(TYPES.ITestResultDao).to(TestResultDao).inSingletonScope();
			/* INSERT BINDING */
            bind<IJobSiteDao>(TYPES.IJobSiteDao).to(JobSiteDao).inSingletonScope();
            bind<ISampleDao>(TYPES.ISampleDao).to(SampleDao).inSingletonScope();
        });
    }

}

export = DataAccessModule;