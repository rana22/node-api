import IBaseDao = require("./IBaseDao");
import {injectable, unmanaged} from "inversify";

@injectable()
abstract class BaseDao<M> implements IBaseDao<M> {

    protected _model: any;

    constructor (@unmanaged() schemaModel: any) {
        this._model = schemaModel;
    }

    create(item: M): Promise<M> {
        return this._model.create(item);
    }

    retrieve(): Promise<M[]> {
        return this._model.findAll();
    }

    update(item: M, options: Object): Promise<M> {
        return this._model.update(item, options);
    }

    delete(_id: number): Promise<any> {
        return this._model.destroy({where: {id: _id}});
    }

    findById (_id: number): Promise<M> {
        return this._model.findById(_id);
    }

    findOne (options: Object): Promise<M> {
        return this._model.findOne(options);
    }

}

export = BaseDao;