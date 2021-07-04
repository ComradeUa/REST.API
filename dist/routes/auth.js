"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const express_1 = require("express");
const User_1 = require("../schema/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.register = express_1.Router();
exports.register.post('/', async (req, res) => {
    try {
        const { login, password, confiringPassword, email } = req.body;
        const candidate = await User_1.schemaUser.findOne({ login, email });
        if (candidate) {
            return res.status(400).json({ message: 'Пользователь с такими данными уже существует' });
        }
        const hashPassword = bcryptjs_1.default.hashSync(password, 7);
        const user = new User_1.schemaUser({
            login: login,
            password: hashPassword,
            confiringPassword: password,
            email: email,
        });
        await user.save();
        return res.send('Пользователь создан');
    }
    catch (e) {
        res.send(404).json({ message: 'Ошибка регистрации' });
    }
});
