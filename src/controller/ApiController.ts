import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Post} from "../entity/Post";
import {Category} from "../entity/Category";
import {MoreThan, MoreThanOrEqual, LessThan, LessThanOrEqual, Between, In, Any, IsNull,  Like, Equal, Not} from "typeorm";

const queryString = require('query-string');

/*const models = {
    'post': Post,
    'category': Category,
};*/

async function getAll(request: Request, response: Response) {
    let q = request.url.split('?');
    let qs = q.length === 2 ? q[1] : '';

    let parsed = queryString.parse(qs, {arrayFormat: "comma", parseNumbers: true});
    let {skip, take, select, order, include, ...search} = parsed;
    console.log(parsed);

    const repo = getManager().getRepository(request.params.model);

    const ops = [Like, Not, Equal, MoreThan, MoreThanOrEqual, LessThan, LessThanOrEqual, IsNull, In, Between];
    const operators = ops.reduce((obj, op) => {
        let key = op.name.toLowerCase();
        obj[key] = op;
        return obj;
    }, {});
    console.log(operators);

    let filter = {};
    Object.keys(search).forEach(key => {
        let val = search[key];

        if (key.includes('__')) {
            let [k, oper] = key.split('__');
            filter[k] = {};
            filter[k] = operators[oper](val);
        } else if (key.includes(',')) {
            // TODO or operator
        } else {
            filter[key] = val;
        }
    });
    console.log(filter);

    let orderBy = {};

    order = order instanceof Array ? order : [order];
    order.filter(Boolean).forEach((o) => {
        let dir = o.startsWith('-') ? 'DESC' : 'ASC';
        let col = o.startsWith('-') ? o.substring(1) : o;
        orderBy[col] = dir;
    });
    console.log(orderBy);

    // load a post by a given post id
    const entities = await repo.find({
        select: select,
        where: filter,
        skip: skip,
        take: take,
        order: orderBy,
        relations: include ? [].concat(include) : undefined,
    });

    response.send(entities);
}

async function getById(request: Request, response: Response) {
    const repo = getManager().getRepository(request.params.model);
    const entity = await repo.findOneOrFail({id: request.params.id});

    response.send(entity);
}

async function create(request: Request, response: Response) {
    const repo = getManager().getRepository(request.params.model);
    const entity = repo.create(request.body);

    await repo.save(entity);

    response.send(entity);
}

async function update(request: Request, response: Response) {
    const repo = getManager().getRepository(request.params.model);
    const entity = await repo.update(request.params.id, request.body);

    //await repo.save(entity);

    response.send("updated");
}

module.exports = {getById, getAll, create, update};