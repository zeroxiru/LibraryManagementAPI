"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./app/controllers/book.controller");
const borrow_controller_1 = require("./app/controllers/borrow.controller");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: ["http://localhost:5173"], credentials: true }));
app.use(express_1.default.json());
app.use('/api/books', book_controller_1.bookRoutes);
app.use('/api/borrow', borrow_controller_1.borrowRoutes);
app.get('/', (req, res) => {
    res.send("Welcome to Library Management System  App");
});
// app.use((error: any, req: Request, res: Response, next: NextFunction) => {
//   console.error('Global Error Handler:', error);
//  let statusCode =error?.statusCode || 500;
//  let message = error?.message || "Something went wrong";
//  let errors: {[key: string]: string} | undefined;
//  if(error.name === "ValidationError") { 
//   statusCode = 400;
//   message ='Validation Error';
//   errors = {}
//   for (const field in error.errors){ 
//     errors[field] = error.errors[field].message;
//   }
//  } else if (error.code ===11000){
//   statusCode = 409;
//   message = `Duplicate key error: ${JSON.stringify(error.keyValue)} already exists`
//  }
//     res.status(statusCode).json({
//     success: false,
//     message,
//     errors
//   });
// });
app.use((error, req, res, next) => {
    console.error("Global Error Handler:", error);
    let statusCode = (error === null || error === void 0 ? void 0 : error.statusCode) || 500;
    let message = (error === null || error === void 0 ? void 0 : error.message) || "Something went wrong";
    // Handle Mongoose ValidationError
    if (error.name === "ValidationError") {
        statusCode = 400;
        message = "Validation failed";
        res.status(statusCode).json({
            message,
            success: false,
            error,
        });
    }
    else if (error.code === 11000) {
        statusCode = 409;
        message = `Duplicate key error: ${JSON.stringify(error.keyValue)} already exists`;
    }
    res.status(statusCode).json({
        message,
        success: false,
        error,
    });
});
exports.default = app;
