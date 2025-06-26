import express, { NextFunction, Request, Response } from "express";
import { Book } from "../models/book.model";

export const bookRoutes = express.Router();

// create a single book data
bookRoutes.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
  const book = await Book.create(body);

  res.status(201).json({
    success: true,
    message: "Book created successfully",
    data: book,
  });
    
  } catch (error) {
    next(error)
  }
});

//get all books with filtering, sorting and limit
bookRoutes.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const queryGenre = req.query.filter as string;
    const sortField = req.query.sortBy as string;
    const sortOrder = req.query.sort as string;
    const queryLimit = parseInt(req.query.limit as string);

    const filter: Record<string, any> = {};
    const sortOption: Record<string, 1 | -1> = {};

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
      const order = sortOrder?.toLowerCase() === "desc" ? -1 : 1;
      sortOption[sortField] = order;
    }

    const books = await Book.find(filter).sort(sortOption).limit(queryLimit || 10);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books
    });
  } catch (error) {
    next(error);
  }
});
// get single book with id

bookRoutes.get('/:bookId', async (req:Request, res: Response)=> { 
    const id =req.params.bookId
    const book = await Book.findById(id)

    res.status(201).json({
    success: true,
    message: "Books retrieved successfully",
    data: book,
  });

})

// update single book with id
bookRoutes.put('/:bookId', async (req:Request, res: Response)=> {
  const id = req.params.bookId;
  const updatedBody = req.body;
  const book = await Book.findOneAndUpdate({_id: id}, updatedBody, {new: true})

     res.status(201).json({
        success: true,
        message:` Book updated successfully `,
        data: book
     })

})

// delete a single book with id

bookRoutes.delete('/:bookId', async (req:Request, res:Response)=>{ 
  const id = req.params.bookId;
  const book = await Book.findOneAndDelete({_id: id} )

    res.status(201).json({
        success: true,
        message:` Book deleted successfully `,
        data: null
     })

})

