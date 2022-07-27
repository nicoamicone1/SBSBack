"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const products_1 = __importDefault(require("./products"));
const route = (0, express_1.Router)();
route.use("/products", products_1.default);
route.post('/signup', auth_1.signUp);
route.post('/login', auth_1.logIn);
exports.default = route;
