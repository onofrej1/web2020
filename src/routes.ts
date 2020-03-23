import {postGetAllAction} from "./controller/PostGetAllAction";
import {postGetByIdAction} from "./controller/PostGetByIdAction";
import {postSaveAction} from "./controller/PostSaveAction";
//import {getAll} from "./controller/ApiController";
const apiController = require('./controller/ApiController');

/**
 * All application routes.
 */
export const AppRoutes = [
   /* {
        path: "/posts",
        method: "get",
        action: postGetAllAction
    },
    {
        path: "/posts/:id",
        method: "get",
        action: postGetByIdAction
    },
    {
        path: "/posts",
        method: "post",
        action: postSaveAction
    },*/
    {
        path: "/api/:model/:id",
        method: "get",
        action: apiController.getById
    },
    {
        path: "/api/:model",
        method: "get",
        action: apiController.getAll
    },
    {
        path: "/api/:model",
        method: "post",
        action: apiController.create
    },
    {
        path: "/api/:model/:id",
        method: "patch",
        action: apiController.update
    },
    {
        path: "/api/:model/:id",
        method: "delete",
        action: apiController.remove
    }
];