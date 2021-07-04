"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaUser = void 0;
const mongoose_1 = require("mongoose");
const User = new mongoose_1.Schema({
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
});
exports.schemaUser = mongoose_1.model('user', User);
