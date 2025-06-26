import { model, Schema } from "mongoose";
import { BorrowStaticMethods, IBorrow } from "../interfaces/borrow.interface";
import { IBook } from "../interfaces/book.interface";
import { Book } from "./book.model";

const borrowSchema = new Schema<IBorrow, BorrowStaticMethods>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    quantity: { type: Number,
       required: true,
       min: [1, "Quantity must be a positive number"] },
    dueDate: { type: Date, required: true },
  },
  { versionKey: false, timestamps: true }
);

borrowSchema.static("updateBorrowCopies", async function 
  (bookId: string, quantity: number): Promise<IBook>{
   const book =  await Book.findById(bookId)

   if(!book) throw new Error ("Book not Found");

   if(quantity > book.copies){ 
    const validationError: any = new Error("Validation Error");
    validationError.name = "ValidationError";
    validationError.errors =  { 
      copies: { 
        message: "Not enough copies are available"
      },
    }
    throw validationError;
   }
   
   book.copies -= quantity;
   if(book.copies === 0) { 
    book.available = false;
   }
   await book.save();

    return book;
})

export const Borrow =  model<IBorrow, BorrowStaticMethods>("Borrow", borrowSchema)
