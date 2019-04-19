import IReadController = require("./base/IReadController");
import ICreateController = require("./base/ICreateController");
import IDeleteController = require("./base/IDeleteController");
import {ITokenModel} from "../model/ITokenModel";
import express = require("express");

interface IAuthController {
    login(req: express.Request, res: express.Response): void;
    logout(req: express.Request, res: express.Response): any;
    session(req: express.Request, res: express.Response): any;
}

export = IAuthController;