import express, { NextFunction, Request, Response } from "express"
import { Book } from "../models/book.model";
import { Borrow } from "../models/borrow.model";
import { title } from "process";

export const borrowRoutes =  express.Router()

borrowRoutes.post('/',async (req: Request, res: Response, next: NextFunction)=>{ 
    try {
        const {book: bookId, quantity, dueDate} = req.body;
        await Borrow.updateBorrowCopies(bookId, quantity);
        const borrowCopies = await Borrow.create({ 
            book: bookId,
            quantity,
            dueDate
        })

        res.status(201).json({ 
            success: true,
            message:"Book borrowed successfully",
            data: borrowCopies
        })
    } catch (error) {
        next(error)
    }
})


borrowRoutes.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books", // MongoDB collection name, must be lowercase plural
          localField: "_id",
          foreignField: "_id",
          as: "bookInfo",
        },
      },
      {
        $unwind: "$bookInfo",
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookInfo.title",
            isbn: "$bookInfo.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary, // ✅ send the actual result
    });
  } catch (error) {
    next(error);
  }
});

