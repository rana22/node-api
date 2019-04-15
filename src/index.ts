
import * as express from 'express';
import 'reflect-metadata';
import { InversifyExpressServer } from "inversify-express-utils";
import { Container } from 'inversify';
import "./controllers/AuthController";
import { FooService } from './controllers/FooService';
import * as bodyParser from 'body-parser';
// var bodyParser= require('body-parser');

let container = new Container();

container.bind<FooService>('FooService').to(FooService);
let server = new InversifyExpressServer(container);
var port =  3000;

server.setConfig((app) => {
    app.set("port", port);
    app.use(bodyParser.json());
    // app.use(Middleware.configuration);
});

let app = server.build();
app.listen(port, () => {
    console.log("Node app is running at localhost:" + port);
});

