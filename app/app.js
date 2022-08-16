"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express = require("express");
const cors = require("cors");
const routes_1 = require("./api/v1/posts/routes");
const routes_2 = require("./api/v1/authors/routes");
const app = express();
// settings
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : '3000';
// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// routes
app.use('/api/v1/publicaciones', routes_1.default);
app.use('/api/v1/autores', routes_2.default);
// 404 not found
app.use((_req, res) => {
    res.status(404).send().end();
});
// start Server
app.listen(port, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${port}`);
});
