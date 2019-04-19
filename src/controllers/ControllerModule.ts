import {ContainerModule, interfaces} from "inversify";
import Bind = interfaces.Bind;
import {TYPE} from "inversify-express-utils";
import TAGS from "../config/Tags";
import { Container } from 'inversify';
import {UserControllerFactory} from "./UserController";
import IUserController = require("./IUserController");


class ControllerModule {

    static config (container: Container) {
        return new ContainerModule((bind: interfaces.Bind) => {
            let userController = UserControllerFactory(container);
            bind<IUserController>(TYPE.Controller).to(userController).inSingletonScope().whenTargetNamed(TAGS.UserController);
            // bind<IUserController>("UserController").to(UserController);
            });
    }

}

export = ControllerModule;