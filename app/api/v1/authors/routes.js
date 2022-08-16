"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("./controllers");
exports.default = (0, express_1.Router)()
    .get('/', controllers_1.default.getAllAuthors)
    .get('/:id', controllers_1.default.getOneAuthor)
    .post('/', controllers_1.default.createNewAuthor);
