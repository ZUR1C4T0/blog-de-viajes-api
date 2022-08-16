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
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { busqueda } = req.query;
    try {
        const result = !busqueda
            ? yield services_1.default.getAllPosts()
            : yield services_1.default.getAllPosts(String(busqueda));
        if (result && result.length === 0) {
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
const getOnePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _id = Number(id);
    if (isNaN(_id)) {
        return res.status(400).json({});
    }
    try {
        const result = yield services_1.default.getOnePost(_id);
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
const createNewPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, contrasena } = req.query;
    const { titulo, resumen, contenido } = req.body;
    const _data = [email, contrasena, titulo, resumen, contenido];
    if (_data.some(val => !val || val.length === 0)) {
        res.status(400).json({});
    }
    try {
        const [$email, $contrasena] = [email, contrasena].map(val => String(val));
        const autor_id = yield services_1.default.getAuthorID($email, $contrasena);
        if (!autor_id) {
            res.status(401).json({ message: 'Invalid credentials. Email and password do not match' });
        }
        else {
            const createdPost = yield services_1.default.createNewPost({
                titulo: String(titulo),
                resumen: String(resumen),
                contenido: String(contenido),
                autor_id: autor_id
            });
            res.status(201).json(createdPost);
        }
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
const deleteOnePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, contrasena } = req.query;
    const { id } = req.params;
    const _id = Number(id);
    const _data = [email, contrasena, id];
    if (_data.some(val => !val || val.length === 0) || isNaN(_id)) {
        res.status(400).json({});
    }
    try {
        const [$email, $contrasena] = [email, contrasena].map(val => String(val));
        const autor_id = yield services_1.default.getAuthorID($email, $contrasena);
        if (!autor_id) {
            res.status(412).json({ message: 'Invalid credentials. Email and password do not match' });
        }
        else {
            const deletedPosts = yield services_1.default.deleteOnePost(_id, autor_id);
            if (deletedPosts === 0)
                res.status(403).json({ message: "You can't delete this post" });
            else
                res.status(200).json({ message: 'Post deleted successfully' });
        }
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.default = { getAllPosts, getOnePost, createNewPost, deleteOnePost };
