"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("./schema/User");
const authRegister_1 = require("./routes/authRegister");
const authLogin_1 = require("./routes/authLogin");
const app = express_1.default();
const IP = 3000;
async function connect() {
    try {
        await mongoose_1.default.connect('mongodb+srv://Ivan:Ivan@cluster0.30heg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
            native_parser: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
    catch (e) {
        console.log(e);
    }
}
async function boostrap() {
    await User_1.schemaUser.createCollection();
}
app.listen(IP, () => {
    console.log(`Server has been started http://localhost:${IP}`);
});
app.use(express_1.default.json());
app.use('/register', authRegister_1.register);
app.use('/login', authLogin_1.login);
connect();
boostrap();
