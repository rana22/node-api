import express = require("express");

interface IUpdateController {
    update(req: express.Request, res: express.Response): Promise<any>;
}

export = IUpdateController;