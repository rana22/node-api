import express = require("express");

interface ICreateController<M> {
    create(req: express.Request, res: express.Response): Promise<M>;
}

export = ICreateController;