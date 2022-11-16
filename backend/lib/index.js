"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var statusCodes_1 = require("./helpers/statusCodes");
var dotenv = require("dotenv");
dotenv.config();
var app = express();
app.use(express.json());
var PORT = process.env.PORT || 3001;
console.log(PORT);
app.get('/', function (_req, res) {
    res.status(statusCodes_1.default.OK).send('IT\'S WORKING!');
});
app.listen(PORT, function () {
    console.log("O servidor est\u00E1 rodando em http://localhost:".concat(PORT));
});
