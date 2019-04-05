// import e = require("express");
// import {Controller, Get, Post, Delete} from "inversify-express-utils";
// import {injectable, inject} from "inversify";
// import IAuthController = require("./IAuthController");
// import { Kernel } from 'inversify';

// export function AuthControllerFactory(kernel: Kernel) {

//     @injectable()
//     @Controller('/')
//     class AuthController {

//         private _service: IAuthService;

//         constructor(@inject(TYPES.IAuthService) service: IAuthService) {
//             this._service = service;
//         }

//         @Get('/session', kernel.get<e.RequestHandler>('Authenticate'))
//         public session(req: e.Request, res: e.Response): any {
//             //console.log(req.user);
//             return req.user;
//         }

//     }

//     return AuthController;
// }
import { injectable, inject } from "inversify";
import {
    controller, httpGet, BaseHttpController, HttpResponseMessage, StringContent
} from "inversify-express-utils";
 
@controller("/")
class ExampleController extends BaseHttpController {
    @httpGet("/foo")
    public async get() {
        const response = new HttpResponseMessage(200);
        response.content = new StringContent("foo");
        return response;
    }
}