import express from 'express';
import mongoose from 'mongoose';
import { schemaUser } from './schema/User';
import { register } from './routes/authRegister';
import { login } from './routes/authLogin';
const app = express();
const IP: number = 3000;
async function connect() {
  try {
    await mongoose.connect(
      'mongodb+srv://Ivan:Ivan@cluster0.30heg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      {
        native_parser: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  } catch (e) {
    console.log(e);
  }
}
async function boostrap() {
  await schemaUser.createCollection();
}
app.listen(IP, () => {
  console.log(`Server has been started http://localhost:${IP}`);
});
app.use(express.json());
app.use('/register', register);
app.use('/login', login);
connect();
boostrap();
