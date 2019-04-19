
// import * as express from 'express';
// import 'reflect-metadata';
// import Passport = require("passport");
// import { InversifyExpressServer } from "inversify-express-utils";
// import Middleware = require("./config/BaseMiddleware");
// import DataAccessModule = require("./dao/DataAccessModule");
// import ServiceModule = require("./service/ServiceModule");
// import { Container } from 'inversify';
// import "./controllers/AuthController";
// import "./controllers/UserController";
// import ControllerModule = require("./controllers/ControllerModule");
// import { FooService } from './controllers/FooService';
// import * as bodyParser from 'body-parser';

// import Permission = require("./utils/Permission");
// import Auth = require('./utils/Auth');
// // var bodyParser= require('body-parser');
// let container = new Container();
// let permission: Permission = <Permission>container.get("Permission");
// container.bind<express.RequestHandler>('Authenticate').toConstantValue(Passport.authenticate(['bearer'], { session: false }));
// container.bind<express.RequestHandler>('Permissions').toConstantValue((req: express.Request, res: express.Response, next: Function) => {
//     permission.checkUserPermission(req.baseUrl,req.route.path,req.method, req.user).then(function (accessResult) {
//         if(!accessResult) {
//             res.statusCode = 403;
//             return res.end('Forbidden');
//         }
//         return next();
//     });

// });

// container.bind<Permission>("Permission").to(Permission);
// container.bind<FooService>('FooService').to(FooService);
// container.load(ControllerModule.config(container));
// container.load(ServiceModule.config);

// let auth : Auth = <Auth>container.get("Auth");
// auth.init();

// let server = new InversifyExpressServer(container);
// var port =  3000;

// server.setConfig((app) => {
//     app.set("port", port);
//     app.use(bodyParser.json());
//     // app.use(Middleware.configuration);
// });

// let app = server.build();
// app.listen(port, () => {
//     console.log("Node app is running at localhost:" + port);
// });


require('dotenv').config();
import * as express from 'express';
import 'reflect-metadata';
import { InversifyExpressServer } from "inversify-express-utils";
import { Container } from 'inversify';
import Middleware = require("./config/BaseMiddleware");
import bodyParser = require("body-parser");
import DataAccessModule = require("./dao/DataAccessModule");
import ServiceModule = require("./service/ServiceModule");
import ControllerModule = require("./controllers/ControllerModule");
import Passport = require("passport");
import "./controllers/AuthController";
import Auth = require("./utils/Auth");
import Permission = require("./utils/Permission");
import AWS = require('aws-sdk');
var cors = require("cors");
var multer = require('multer');
var multerS3 = require('multer-s3');

let multerMiddleware: express.RequestHandler = multer({
    storage: multerS3({
        s3: new AWS.S3(),
        bucket: process.env.S3_BUCKET,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            cb(null, req.user.id + '/' + file.originalname)
        }
    })
}).single('file');

let kernel = new Container();
kernel.bind<express.RequestHandler>('Authenticate').toConstantValue(Passport.authenticate(['bearer'], { session: false }));
kernel.bind<express.RequestHandler>('Admin').toConstantValue((req: express.Request, res: express.Response, next: Function) => {
    if(!req.user.hasAccess()) {
        res.statusCode = 403;
        return res.end('Forbidden');
    }
    return next();
});

kernel.bind<express.RequestHandler>('Permissions').toConstantValue((req: express.Request, res: express.Response, next: Function) => {
    permission.checkUserPermission(req.baseUrl,req.route.path,req.method, req.user).then(function (accessResult) {
        if(!accessResult) {
            res.statusCode = 403;
            return res.end('Forbidden');
        }
        return next();
    });

});

kernel.bind<express.RequestHandler>('Oauth').toConstantValue(Auth.server.token());
kernel.bind<express.ErrorRequestHandler>('OauthError').toConstantValue(Auth.server.errorHandler());
kernel.bind<express.RequestHandler>('MulterMiddleware').toConstantValue(multerMiddleware);
kernel.bind<Permission>("Permission").to(Permission);
kernel.bind<Auth>("Auth").to(Auth);
kernel.load(DataAccessModule.config);
kernel.load(ServiceModule.config);
// kernel.load(ControllerModule.config(kernel));

let permission: Permission = <Permission>kernel.get("Permission");
let auth : Auth = <Auth>kernel.get("Auth");
auth.init();

let server = new InversifyExpressServer(kernel);
var port = 3000;

server.setConfig((app) => {
    app.set("port", port);
    app.use(cors());
    app.use(bodyParser.json());
    app.use(Passport.initialize());
    // app.use(Middleware.configuration);
});

server.setErrorConfig((app) => {
    app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (err.name == "SequelizeUniqueConstraintError") {
            var body = [];
            for (var i in err.errors) {
                var errorString = err.errors[i].path + " " + err.errors[i].value + " already exists";
                body.push(errorString);
            }
            res.status(409).send(body);
        } else if (err.status) {
            res.status(err.status).send(err.body);
        } else {
            res.status(500).send('An unknown error has occurred.');
        }
    });
});

let app = server.build();
app.listen(port, () => {
    console.log("Node app is running at localhost:" + port);
});