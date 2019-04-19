interface IBaseService<M> {
    create(item: M) : Promise<M>;
    retrieve() : Promise<M[]>;
    findById(_id: number) : Promise<M>;
    findOne(options: Object): Promise<M>
    update(_id: number, item: M) : Promise<any>;
    delete(_id: number) : Promise<any>;
}

export = IBaseService;