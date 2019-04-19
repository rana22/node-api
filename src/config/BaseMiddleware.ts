import express = require("express");
import bodyParser = require("body-parser");

class BaseMiddleware {

    static get configuration () {
        var app = express();
        app.use(bodyParser.json());

        return app;
    }

}

Object.seal(BaseMiddleware);
export = BaseMiddleware;