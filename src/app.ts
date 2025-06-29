import express, { Application, NextFunction, Request, Response } from 'express'
import {bookRoutes} from './app/controllers/book.controller'
import { borrowRoutes } from './app/controllers/borrow.controller';
// import { usersRoutes } from './app/controllers/user.controller';

const app: Application = express();
app.use(express.json())
app.use('/api/books', bookRoutes)
app.use('/api/borrow', borrowRoutes)





app.get('/', (req:Request, res: Response)=> { 
    
    res.send("Welcome to Library Management System  App")
})

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

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Global Error Handler:", error);

  let statusCode = error?.statusCode || 500;
  let message = error?.message || "Something went wrong";

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
  else if(error.code ===11000) {
  statusCode = 409;
  message = `Duplicate key error: ${JSON.stringify(error.keyValue)} already exists`
 }

  res.status(statusCode).json({
    message,
    success: false,
    error,
  });
});

export default app;