import { Model, Types } from "mongoose";
import { IBook } from "./book.interface";

export interface IBorrow{ 
    book : Types.ObjectId,
    quantity : number,
    dueDate : Date
 
}

export interface BorrowStaticMethods extends Model<IBorrow> {
    updateBorrowCopies(bookId: string, quantity: number): Promise<IBook>
}