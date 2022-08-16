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
const getAllAuthors = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = 'SELECT * FROM autores';
        const [rowDataPacket] = yield poolConnection_1.default.execute(query);
        data = rowDataPacket;
    }
    catch (err) {
        throw err;
    }
    return data;
});
const getOneAuthor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `SELECT id, email, nombre, avatar FROM autores WHERE id = ${(0, promise_1.escape)(id)};`;
        const [rowDataPacket] = yield poolConnection_1.default.execute(query);
        data = rowDataPacket;
    }
    catch (err) {
        throw err;
    }
    return data[0];
});
const validateDuplicates = (nombre, email) => __awaiter(void 0, void 0, void 0, function* () {
    const duplicates = { nombre: false, email: false };
    try {
        const query1 = `SELECT nombre FROM autores WHERE nombre = ${(0, promise_1.escape)(nombre)};`;
        const [rowDataPacket1] = yield poolConnection_1.default.execute(query1);
        if (!rowDataPacket1)
            duplicates.nombre = true;
        const query2 = `SELECT email FROM autores WHERE nombre = ${(0, promise_1.escape)(email)};`;
        const [rowDataPacket2] = yield poolConnection_1.default.execute(query2);
        if (!rowDataPacket2)
            duplicates.email = true;
    }
    catch (err) {
        throw err;
    }
    return duplicates;
});
const createNewAuthor = (nombre, email, contrasena) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `INSERT INTO autores (nombre, email, contrasena)
      VALUES (${(0, promise_1.escape)(nombre)}, ${(0, promise_1.escape)(email)}, ${(0, promise_1.escape)(contrasena)});`;
        const [okPacket] = yield poolConnection_1.default.execute(query);
        const { insertId } = okPacket;
        var authorCreated = yield getOneAuthor(insertId);
    }
    catch (err) {
        throw err;
    }
    return authorCreated;
});
exports.default = { getAllAuthors, getOneAuthor, validateDuplicates, createNewAuthor };
