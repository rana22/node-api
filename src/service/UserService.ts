import IUserService = require("./IUserService");
import {IUserModel} from "../model/IUserModel";
import {injectable,inject} from "inversify";
import BaseService = require("./base/BaseService");
import IUserDao = require("../dao/IUserDao");
import TYPES from "../config/Types";
import md5 = require("md5");
import {IUserInstance} from "../model/IUserModel";
var request = require('request-promise');
import nodemailer = require('nodemailer');
import uuid = require("uuid");

@injectable()
class UserService extends BaseService<IUserDao,IUserModel> implements IUserService {

    constructor (@inject(TYPES.IUserDao) dao: IUserDao) {
        super(dao);
    }

    public authenticateUser(_username: string, _password: string) : Promise<IUserModel> {
        return new Promise<IUserModel>((resolve, reject) => {
            this._dao.findByUsernamePassword(_username,md5(_password))
                .then((results) => {
                    if(results) {
                        resolve(results);
                    }else {
                        reject();
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    public createUser(item: IUserModel, roles: Array<number>): Promise<IUserModel> {
        return new Promise<IUserModel>((resolve, reject) => {
            item.password = md5(item.password);
            let createdId: number;
            let userCreated = this._dao.create(item);

            let setUserRoles = userCreated.then((results) => {
                createdId = results.id;
                let user = results as IUserInstance;
                return user.addRoles(roles)
            }).catch((error) => {
                reject(error);
            });

            let getCreatedUser = setUserRoles.then(() => {
                return this.findById(createdId);
            }).catch((error) => {
                reject(error);
            });

            getCreatedUser.then((user) => {
                let promises = [];

                Promise.all(promises)
                    .then(() => {
                        resolve(user as IUserModel);
                        return null; //this is to handle runaway promise warning, see http://goo.gl/rRqMUw
                    })
                    .catch((error) => {
                        reject(error);
                    });
                return null; //this is to handle runaway promise warning, see http://goo.gl/rRqMUw
            });

        });
    }

    public update(_id: number, item: IUserModel): Promise<any> {
        return new Promise<IUserModel>((resolve, reject) => {
            delete item.password;
            delete item.username;
            super.update(_id, item)
                .then((results) => {
                    resolve(results);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    public updateUser(_id: number, item: IUserModel, roles: Array<number>): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            delete item.password;
            delete item.username;

            let isUpdated = super.update(_id, item);

            let foundUpdatedUser = isUpdated.then(() => {
                return this.findById(_id);
            }).catch((error) => {
                reject(error);
            });

            let rolesAdded = foundUpdatedUser.then((results) => {
                let user = results as IUserInstance;
                return user.setRoles(roles);
            }).catch((error) => {
                reject(error);
            });

            let haveUpdateUser = rolesAdded.then(() => {
                return this.findById(_id);
            }).catch((error) => {
                reject(error);
            });

            haveUpdateUser.then((results) => {
                resolve(results);
            }).catch((error) => {
                reject(error);
            });

        });
    }

    public forgotPassword(_email: string, _path: string) : Promise<any> {
        return new Promise<any>((resolve, reject) => {
            let foundUser = this._dao.findByEmail(_email);

            let item = {resetPasswordToken: uuid.v4(), resetPasswordExpires: Date.now() + 3600000};
            foundUser.then((results) => {
                this._dao.update(<any>item, {
                    where: {
                        email: results.email
                    }
                }).then(() => {

                    let transport = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'i.am.groot.xyz@gmail.com',
                            pass: 'mamabc123'
                        }
                    });

                    let mailOptions = {
                        from: 'i.am.groot.xyz@gmail.com',
                        to: _email,
                        subject: 'Forgot Password',
                        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                        _path + '/' + item.resetPasswordToken + '\n\n' +
                        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                    };

                    transport.sendMail(mailOptions).then((results) => {
                        if(results) {
                            resolve(results);
                        }else {
                            reject();
                        }
                    }).catch((error) => {
                        reject(error);
                    });

                }).catch((error) => {
                    reject(error);
                });

            }).catch((error) => {
                reject(error);
            });

        });
    }

    public findUserWithResetToken(_resetPasswordToken: string) : Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this._dao.findByResetToken(_resetPasswordToken).then((results) => {
                if(results) {
                    resolve(results);
                }else {
                    reject();
                }
            }).catch((error) => {
                reject(error);
            });
        });
    }

    public updateUserPassword(_id: number, _resetPasswordToken: string, _password: string) : Promise<any> {
        let item = {password: md5(_password), resetPasswordToken: null, resetPasswordExpires: null};

        return new Promise<IUserModel>((resolve, reject) => {
            super.update(_id, <any>item)
                .then((results) => {
                    resolve(results);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

}

export = UserService;