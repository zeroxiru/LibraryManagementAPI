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
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
exports.bookRoutes = express_1.default.Router();
// create a single book data
exports.bookRoutes.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const book = yield book_model_1.Book.create(body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book,
        });
    }
    catch (error) {
        next(error);
    }
}));
//get all books with filtering, sorting and limit
exports.bookRoutes.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryGenre = req.query.filter;
        const sortField = req.query.sortBy;
        const sortOrder = req.query.sort;
        const queryLimit = parseInt(req.query.limit);
        const filter = {};
        const sortOption = {};
        if (queryGenre) {
            filter.genre = queryGenre.toUpperCase();
        }
        if (sortOrder && !sortField) {
            res.status(400).json({
                success: false,
                message: "sortBy is not provided.",
            });
        }
        if (sortField) {
            const order = (sortOrder === null || sortOrder === void 0 ? void 0 : sortOrder.toLowerCase()) === "desc" ? -1 : 1;
            sortOption[sortField] = order;
        }
        const books = yield book_model_1.Book.find(filter).sort(sortOption).limit(queryLimit || 10);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books
        });
    }
    catch (error) {
        next(error);
    }
}));
// get single book with id
exports.bookRoutes.get('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.bookId;
    const book = yield book_model_1.Book.findById(id);
    res.status(201).json({
        success: true,
        message: "Books retrieved successfully",
        data: book,
    });
}));
// update single book with id
exports.bookRoutes.put('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.bookId;
    const updatedBody = req.body;
    const book = yield book_model_1.Book.findOneAndUpdate({ _id: id }, updatedBody, { new: true });
    res.status(201).json({
        success: true,
        message: ` Book updated successfully `,
        data: book
    });
}));
// delete a single book with id
exports.bookRoutes.delete('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.bookId;
    const book = yield book_model_1.Book.findOneAndDelete({ _id: id });
    res.status(201).json({
        success: true,
        message: ` Book deleted successfully `,
        data: null
    });
}));
