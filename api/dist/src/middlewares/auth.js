"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logIn = exports.signUp = void 0;
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcrypt = require('bcryptjs');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const encryptPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt.genSalt(10);
    return yield bcrypt.hash(password, salt);
});
const comparePasswords = (receivedPassword, savedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt.compare(receivedPassword, savedPassword);
});
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const found = yield User_1.default.find({ username });
        if (found.length > 0) {
            res.send('There is an account already created with this username');
        }
        else {
            const user = new User_1.default({ username, password: yield encryptPassword(password) });
            yield user.save();
            res.json({ message: "Successfully registered" });
        }
    }
    catch (err) {
        next(err);
    }
});
exports.signUp = signUp;
const logIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const found = yield User_1.default.findOne({ username });
        if (!found)
            return res.json({ message: "User not found" });
        const match = yield comparePasswords(password, found.password);
        if (!match) {
            res.json({ message: 'Passwords do not match' });
        }
        else {
            const token = jsonwebtoken_1.default.sign({ id: found._id }, `${process.env.JWT_SECRET}`, { expiresIn: 86400 });
            return res.json({ user: found, token });
        }
    }
    catch (error) {
        res.status(404).json({ message: error });
    }
});
exports.logIn = logIn;
