import {ContainerModule, interfaces} from "inversify";
import Bind = interfaces.Bind;
import TYPES from "../config/Types";
import UserService = require("./UserService");
import IUserService = require("./IUserService");
import AuthService = require("./AuthService");
import IAuthService = require("./IAuthService");
import FileService = require("./FileService");
import IFileService = require("./IFileService");
import PermissionService = require("./PermissionService");
import IPermissionService = require("./IPermissionService");
import RoleService = require("./RoleService");
import IRoleService = require("./IRoleService");
import TestResultService = require("./TestResultService");
import ITestResultService = require("./ITestResultService");
/* INSERT IMPORTS */
import JobSiteService = require("./JobSiteService");
import IJobSiteService = require("./IJobSiteService");
import SampleService = require("./SampleService");
import ISampleService = require("./ISampleService");

class ServiceModule {

    static get config () {
        return new ContainerModule((bind: Bind) => {
            bind<IUserService>(TYPES.IUserService).to(UserService).inSingletonScope();
            bind<IAuthService>(TYPES.IAuthService).to(AuthService).inSingletonScope();
            bind<IFileService>(TYPES.IFileService).to(FileService).inSingletonScope();
            bind<IPermissionService>(TYPES.IPermissionService).to(PermissionService).inSingletonScope();
            bind<IRoleService>(TYPES.IRoleService).to(RoleService).inSingletonScope();
			bind<ITestResultService>(TYPES.ITestResultService).to(TestResultService).inSingletonScope();
			/* INSERT BINDING */
            bind<IJobSiteService>(TYPES.IJobSiteService).to(JobSiteService).inSingletonScope();
            bind<ISampleService>(TYPES.ISampleService).to(SampleService).inSingletonScope();
        });
    }

}

export = ServiceModule;