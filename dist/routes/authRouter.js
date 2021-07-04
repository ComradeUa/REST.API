"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("./auth");
exports.router = express_1.default.Router();
exports.router.post('/registration', auth_1.auth.register);
exports.router.post('/login', auth_1.auth.login);
