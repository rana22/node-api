import {injectable} from "inversify";
import IBaseDao = require("../../dao/base/IBaseDao");
import IBaseService = require("./IBaseService");
import BaseDao = require("../../dao/base/BaseDao");

@injectable()
abstract class BaseService<T extends IBaseDao<M>, M> implements IBaseService<M> {

    protected _dao: T;

    constructor (dao: T) {
        this._dao = dao;
    }

    public create(item: M): Promise<M> {
        return new Promise<M>((resolve, reject) => {
            this._dao.create(item)
                .then((results) => {
                    resolve(results);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    }

    public retrieve() : Promise<M[]> {
        return new Promise<M[]>((resolve, reject) => {
            this._dao.retrieve()
                .then((results) => {
                    resolve(results);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    public findById(_id: number) : Promise<M> {
        return new Promise<M>((resolve, reject) => {
            this._dao.findById(_id)
                .then((results) => {
                    resolve(results || <M>{});
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    public findOne(_options: Object) : Promise<M> {
        return new Promise<M>((resolve, reject) => {
            this._dao.findOne(_options)
                .then((results) => {
                    resolve(results);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    public update(_id: number, item: M): Promise<any> {
        return new Promise<M>((resolve, reject) => {
            this._dao.update(item, {
                where: {
                    id: _id
                }
            })
            .then((results) => {
                resolve(results);
            })
            .catch((error) => {
                reject(error);
            });
        });
    }

    public delete(_id: number): Promise<any> {
        return new Promise<M>((resolve, reject) => {
            this._dao.delete(_id)
                .then((results) => {
                    resolve(results || <M>{});
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

}

export = BaseService;