"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("./services");
const getAllAuthors = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield services_1.default.getAllAuthors();
        if (result.length === 0) {
            res.status(204).end();
        }
        else {
            res.status(200).json(result);
        }
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
const getOneAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _id = Number(id);
    if (isNaN(_id)) {
        res.status(400).json({});
    }
    try {
        const result = yield services_1.default.getOneAuthor(_id);
        if (!result) {
            res.status(404).end();
        }
        else {
            res.status(200).json(result);
        }
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
const createNewAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, email, contrasena } = req.body;
    const _data = [nombre, email, contrasena];
    if (_data.some(val => !val) || _data.some(val => val.length === 0)) {
        res.status(400).json({});
    }
    try {
        const duplicates = yield services_1.default.validateDuplicates(String(nombre), String(email));
        if (duplicates.nombre && duplicates.email) {
            res.status(400).json({ message: 'Username and Email are in use' });
        }
        else if (duplicates.nombre) {
            res.status(400).json({ message: 'Username  in use' });
        }
        else if (duplicates.email) {
            res.status(400).json({ message: 'Email  in use' });
        }
        else {
            const createdAuthor = yield services_1.default.createNewAuthor(String(nombre), String(email), String(contrasena));
            res.status(201).json(createdAuthor);
        }
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.default = { getAllAuthors, getOneAuthor, createNewAuthor };
