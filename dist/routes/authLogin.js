"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const express_1 = require("express");
const User_1 = require("../schema/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.login = express_1.Router();
exports.login.post('/', async (req, res) => {
    const { login, password } = req.body;
    const user = await User_1.schemaUser.findOne({ login });
    if (!user) {
        return res.status(400).send(`Такого ${user} не существует`);
    }
    const validPassword = bcryptjs_1.default.compareSync(password, password);
    if (!validPassword) {
        return res.status(404).send('Неправильный пароль');
    }
});
