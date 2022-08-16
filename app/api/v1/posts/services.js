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
const poolConnection_1 = require("../../../database/poolConnection");
const promise_1 = require("mysql2/promise");
let data = [];
const getAllPosts = (wordToSearch) => __awaiter(void 0, void 0, void 0, function* () {
    const searchQuery = wordToSearch && wordToSearch.length > 0
        ? `WHERE titulo LIKE '%${wordToSearch}%'
        OR resumen LIKE '%${wordToSearch}%'
        OR contenido LIKE '%${wordToSearch}%'`
        : '';
    try {
        const query = `SELECT * FROM publicaciones ${searchQuery};`;
        const [rowDataPacket] = yield poolConnection_1.default.execute(query);
        data = rowDataPacket;
    }
    catch (err) {
        throw err;
    }
    return data;
});
const getOnePost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `SELECT * FROM publicaciones WHERE id = ${(0, promise_1.escape)(id)};`;
        const [rowDataPacket] = yield poolConnection_1.default.execute(query);
        data = rowDataPacket;
    }
    catch (err) {
        throw err;
    }
    return data[0];
});
const getAuthorID = (emial, contrasena) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `SELECT id FROM autores
      WHERE email = ${(0, promise_1.escape)(emial)} AND contrasena = ${(0, promise_1.escape)(contrasena)};`;
        const [rowDataPacket] = yield poolConnection_1.default.execute(query);
        data = rowDataPacket;
        if (data.length > 0)
            var { id } = data[0];
        else
            return null;
    }
    catch (err) {
        throw err;
    }
    return id;
});
const createNewPost = (postBody) => __awaiter(void 0, void 0, void 0, function* () {
    const { titulo, resumen, contenido, autor_id } = postBody;
    try {
        const query = `INSERT INTO publicaciones (titulo, resumen, contenido, autor_id)
      VALUES (${(0, promise_1.escape)(titulo)}, ${(0, promise_1.escape)(resumen)}, ${(0, promise_1.escape)(contenido)}, ${autor_id});`;
        const [okPacket] = yield poolConnection_1.default.execute(query);
        const { insertId } = okPacket;
        var postCreated = yield getOnePost(insertId);
    }
    catch (err) {
        throw err;
    }
    return postCreated;
});
const deleteOnePost = (id, autor_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `DELETE FROM publicaciones WHERE id = ${id} AND autor_id = ${autor_id};`;
        const [rowDataPacket] = yield poolConnection_1.default.execute(query);
        var { affectedRows } = rowDataPacket;
    }
    catch (err) {
        throw err;
    }
    return affectedRows;
});
exports.default = { getAllPosts, getOnePost, getAuthorID, createNewPost, deleteOnePost };
