
interface IBaseDao<M> {
    retrieve() : Promise<M[]>;
    findById(_id: number) : Promise<M>;
    findOne(options: Object): Promise<M>
    create(item: M) : Promise<M>;
    update(item: M, options: Object) : Promise<M>;
    delete(_id: number) : Promise<any>;
}

export = IBaseDao;