"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../schema/User");
class Authorization {
    async register(req, res) {
        try {
            const { login, password, confiringPassword, email } = req.body;
            const candidate = await User_1.schemaUser.findOne({ login, email });
            if (candidate) {
                return res.status(400).json({ message: "Пользователь с такими данными уже существует" });
            }
            const user = new User_1.schemaUser({ login: login, password: password, confiringPassword: password, email: email });
            await user.save();
            return await res.send('Пользователь создан');
        }
        catch (e) {
            res.send(404).json({ message: 'Ошибка регистрации' });
        }
    }
    async login(req, res) {
        try {
            const { login, password } = req.body;
            const user = await User_1.schemaUser.findOne({ login });
            if (!user) {
                return res.status(400).send(`Пользователь с ${user} ненайден или неправильный пароль`);
            }
            ;
            const passwr = await User_1.schemaUser.findOne({ password });
            if (!passwr) {
                return res.status(400).send(`Неправильный пароль, попробуйте еще раз`);
            }
            ;
        }
        catch (e) {
            res.send(404).json({ message: 'Ошибка авторизации' });
        }
    }
}
module.exports = new Authorization();
