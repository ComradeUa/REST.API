import { Router, Request, Response } from 'express';
import { schemaUser } from '../schema/User';
import bcrypt from 'bcryptjs';
export const login = Router();
login.post('/', async (req: Request, res: Response) => {
  const { login, password } = req.body;
  const user = await schemaUser.findOne({ login });
  if (!user) {
    return res.status(400).send(`Такого ${user} не существует`);
  }
  const validPassword = bcrypt.compareSync(password, password);
  if (!validPassword) {
    return res.status(404).send('Неправильный пароль');
  }
});
