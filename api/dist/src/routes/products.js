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
const express_1 = require("express");
const Product_1 = __importDefault(require("../models/Product"));
const Brand_1 = __importDefault(require("../models/Brand"));
const authJwt_1 = require("../middlewares/authJwt");
const route = (0, express_1.Router)();
// ********* GET products *********
route.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const AllProducts = yield Product_1.default.find().populate(["brand"]);
        res.status(200).json(AllProducts);
    }
    catch (error) {
        res.status(404).json({ message: "No products found" });
    }
}));
// ********* GET product by id *********
route.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Product_1.default.findById(req.params.id).populate(["brand"]);
        if (product)
            res.status(200).json(product);
        else
            res.status(200).json({ message: 'Product not found' });
    }
    catch (error) {
        res.status(404).json({ message: 'Product not found' });
    }
}));
// ********* POST product *********
route.post("/", authJwt_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, price, image_url, brand, logo_url } = req.body;
        const newProduct = new Product_1.default({ name, description, price, image_url });
        const brandfound = yield Brand_1.default.findOne({ name: brand });
        if (brandfound)
            newProduct.brand = brandfound._id;
        else {
            const newBrand = new Brand_1.default({ name: brand, logo_url });
            yield newBrand.save();
            newProduct.brand = newBrand._id;
        }
        yield newProduct.save();
        res.status(200).json("Product created successfully");
    }
    catch (error) {
        res.json({ message: "Product could not be created" });
    }
}));
// ********* PUT product *********
route.put("/:id", authJwt_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, price, image_url } = req.body;
        yield Product_1.default.findByIdAndUpdate(req.params.id, { name, description, price, image_url });
        const modifiedProduct = yield Product_1.default.findById(req.params.id);
        res.status(200).json(modifiedProduct);
    }
    catch (error) {
        res.status(404).json({ message: "Product could not be modified" });
    }
}));
// ********* DELETE product *********
route.delete("/:id", authJwt_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Product_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Product deleted successfully" });
    }
    catch (error) {
        res.status(200).json({ message: "Product could not be deleted" });
    }
}));
exports.default = route;
