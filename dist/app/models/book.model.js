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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const VALID_NUMERIC_TITLES = ["1984", "2001", "451"];
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: function (v) {
                const trimmedValue = v.trim();
                if (trimmedValue.length === 0) {
                    return false;
                }
                const isPurelyNumeric = /^\d+$/.test(trimmedValue);
                if (isPurelyNumeric) {
                    // If it's purely numeric, check if it's in our whitelist
                    return VALID_NUMERIC_TITLES.includes(trimmedValue);
                }
                return true;
            },
            // *** Corrected message using template literals (backticks) ***
            message: (props) => {
                const trimmedValue = props.value.trim();
                if (trimmedValue.length === 0) {
                    return 'Title cannot be empty.';
                }
                if (/^\d+$/.test(trimmedValue) && !VALID_NUMERIC_TITLES.includes(trimmedValue)) {
                    return `${trimmedValue} is not a valid title. Titles consisting solely of numbers are not allowed unless they are specific recognized titles.`;
                }
                return `${trimmedValue} is not a valid title.`; // Generic fallback message if needed
            },
        },
    },
    author: { type: String, default: "" },
    genre: {
        type: String,
        required: true,
        enum: [
            "FICTION",
            "NON_FICTION",
            "SCIENCE",
            "HISTORY",
            "backend",
            "BIOGRAPHY",
            "FANTASY",
        ],
    },
    isbn: {
        type: String,
        required: true,
        unique: true,
    },
    description: { type: String, default: "" },
    copies: { type: Number,
        required: true,
        min: [1, "Copies must be a positive number"] },
    available: { type: Boolean, default: true },
}, { versionKey: false, timestamps: true });
bookSchema.pre('save', function (next) {
    const book = this;
    book.title = book.title.trim().split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    next();
});
bookSchema.post('findOneAndUpdate', function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (doc) {
            console.log(`🔄 Book "${doc.title}" was updated.`);
        }
        next();
    });
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
