import express = require("express");

interface IReadController<M> {
    retrieve(req: express.Request, res: express.Response): Promise<M[]>;
    findById(req: express.Request, res: express.Response): Promise<M>
}

export = IReadController;