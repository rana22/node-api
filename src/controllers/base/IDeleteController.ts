import express = require("express");

interface IDeleteController {
    delete(req: express.Request, res: express.Response): Promise<any>;
}

export = IDeleteController;