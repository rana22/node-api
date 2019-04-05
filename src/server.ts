import http from "http";
require('dotenv').config();
import * as express from "express";
import 'reflect-metadata';
import { InversifyExpressServer } from "inversify-express-utils";
import { Kernel } from 'inversify';
import ControllerModule = require("./controllers/ControllerModule");
import bodyParser = require("body-parser");
import { applyMiddleware, applyRoutes } from "./utils";
import middleware from "./middleware";
import errorHandlers from "./middleware/errorHandlers";
import routes from "./services";

process.on("uncaughtException", e => {
  console.log(e);
  process.exit(1);
});

process.on("unhandledRejection", e => {
  console.log(e);
  process.exit(1);
});

// const router = express();
// applyMiddleware(middleware, router);
// applyRoutes(routes, router);
// applyMiddleware(errorHandlers, router);

// const { PORT = 3000 } = process.env;
// const server = http.createServer(router);

// server.listen(PORT, () =>
//   console.log(`Server is running http://localhost:${PORT}...`)
// );

let kernel = new Kernel();
kernel.bind<express.RequestHandler>('middleware').toConstantValue(middleware);
kernel.load(ControllerModule.config(kernel));

