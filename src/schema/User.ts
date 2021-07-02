import { Schema,model } from "mongoose";
const User = new Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    confiringPassword: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})
export const schemaUser = model('user', User);