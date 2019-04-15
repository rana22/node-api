import * as express from "express";
import { interfaces, controller, httpGet, httpPost, httpDelete, request, queryParam, response, requestParam } from "inversify-express-utils";
import { injectable, inject } from "inversify";

@controller("/foo")
export class FooController implements interfaces.Controller {

    @httpGet("/")
    public get(): String {
        return "hello";
    }
}