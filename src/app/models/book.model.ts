import { model, Schema } from "mongoose";
import { IBook } from "../interfaces/book.interface";

const VALID_NUMERIC_TITLES = ["1984", "2001", "451"];

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: {
        validator: function (v: string) {
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
                message: (props: any) => {
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
  },
  { versionKey: false, timestamps: true }
);

bookSchema.pre('save', function (next){
    const book = this as IBook;
    book.title = book.title.trim().split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
    next();
 })

 bookSchema.post('findOneAndUpdate', async function (doc, next) {
  if (doc) {
    console.log(`🔄 Book "${doc.title}" was updated.`);
  }
  next();
});
export const Book = model("Book", bookSchema);
