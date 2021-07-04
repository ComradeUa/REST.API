"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../schema/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class User {
    async registration(req, res) {
        try {
            const { login, password } = req.body;
            const user = User_1.schemaUser.findOne({ login: login, password: password });
            if (!user) {
                return res.status(404).send("Пользователь ненайден");
            }
            const validPassword = bcryptjs_1.default.compareSync(password, password);
            if (!validPassword) {
                return res.send(404).send('Ошибка неправильный логин или пароль');
            }
        }
        catch (e) {
            return res.status(404).send('Error');
        }
    }
    async login(req, res) {
        try {
        }
        catch (e) {
        }
    }
}
module.exports = new User();
