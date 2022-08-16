"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("./controllers");
exports.default = (0, express_1.Router)()
    .get('/', controllers_1.default.getAllPosts)
    .get('/:id', controllers_1.default.getOnePost)
    .post('/', controllers_1.default.createNewPost)
    .delete('/:id', controllers_1.default.deleteOnePost);
