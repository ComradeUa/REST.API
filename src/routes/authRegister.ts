import { Request, Response, NextFunction, Router } from 'express';
import { schemaUser } from '../schema/User';
import bcrypt from 'bcryptjs';
import { validationResult, check } from 'express-validator';
export const register = Router();
register.post(
  '/',
  [
    check('login', 'Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Пароль должен быть больше 4, но меньше 10 символов').isLength({ min: 4, max: 10 }),
    check('email', 'Эмаил не должен быть пустым').notEmpty(),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Ошибка при регистрации', errors });
      }
      const { login, password, confiringPassword, email } = req.body;
      const candidate = await schemaUser.findOne({ login, email });
      if (candidate) {
        return res.status(400).json({ message: 'Пользователь с такими данными уже существует' });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const user = new schemaUser({
        login: login,
        password: hashPassword,
        confiringPassword: password,
        email: email,
      });
      await user.save();
      return res.send('Пользователь создан');
    } catch (e) {
      res.send(404).json({ message: 'Ошибка регистрации' });
    }
  }
);
