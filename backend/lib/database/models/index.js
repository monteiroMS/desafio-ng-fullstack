"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var config = require("../config/database");
exports.default = new sequelize_1.Sequelize(config);
