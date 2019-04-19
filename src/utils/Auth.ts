import {injectable,inject} from "inversify";
import TYPES from "../config/Types";
import Passport = require("passport");
import OAuth2orize = require("oauth2orize");
import Bearer = require("passport-http-bearer");
import Http = require("passport-http");
import IAuthService = require("../service/IAuthService");
import IUserService = require("../service/IUserService");
import md5 = require("md5");
import {IUserInstance} from "../model/IUserModel";
import {ITokenInstance} from "../model/ITokenModel";
const uuidV4 = require('uuid/v4');
const server = OAuth2orize.createServer();

@injectable()
class Auth {

    @inject(TYPES.IAuthService) private _authService: IAuthService;
    @inject(TYPES.IUserService) private _userService: IUserService;

    init() {
        Passport.use(new Bearer.Strategy((token,done) => {
            this._authService.findOne({
                where: {
                    token: token
                }
            }).then((token) => {
                if(token) {
                    this._userService.findById(token.userId)
                        .then((user) => {
                            done(null, user, null);
                        })
                        .catch((error) => {
                            done(error, null, null);
                        });
                }else {
                    done(null, null, null);
                }
            }).catch((error) => {
                done(error, false, null);
            });
        }));

        server.exchange(OAuth2orize.exchange.password((user, username, password, scope, done) => {
            this._userService.authenticateUser(username,password)
                .then((result) => {
                    user = <IUserInstance>result;
                    user.getToken().then((token) => {
                        if(token) {
                            done(null,token.token, null, { user: user });
                        }else {
                            user.createToken({token: uuidV4()})
                                .then((result) => {
                                    if(result) {
                                        user.getToken().then((token) => {
                                            done(null,token.token, null, { user: user });
                                        });
                                    }
                                });
                        }
                    });
                })
                .catch((error) => {
                    done(error);
                });
        }));
    }

    static get server() {
        return server;
    }

}

Object.seal(Auth);
export = Auth;