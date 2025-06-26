# 📚 Library Management System – Backend API

A complete RESTful API built with **Express.js**, **TypeScript**, and **MongoDB** using **Mongoose** ORM. This system allows management of books and borrowing functionalities typically needed in a library context.

---

## 🚀 Features

- 📘 **Books CRUD**
  - Create, Read (with filtering/sorting/limiting), Update, and Delete books
  - Fields: `title`, `author`, `isbn`, `description`, `genre`, `copies`, `available`

- 📥 **Borrow System**
  - Borrow a book (updates copies and availability)
  - Summarize borrowed books via aggregation (title, ISBN, totalQuantity)
  - Reference to `Book` collection using `ObjectId`

- ⚙️ **Advanced Query Support**
  - Filter by genre (`filter=FANTASY`)
  - Sort results by field (`sortBy=createdAt&sort=desc`)
  - Limit number of returned results (`limit=5`)

- ❌ **Global Error Handling**
  - Mongoose validation errors (e.g., "copies must be a positive number")
  - Custom business logic errors (e.g., "Not enough copies are available")
  - Duplicate key handling and fallback messages

- 🧠 **Schema Hooks**
  - Pre-save: Auto-format book titles and genre
  - Pre-remove: Prevent deletion if book is currently borrowed
  - Post-update: Logs updates to book information

---



---

## ⚙️ Technologies Used

- **Express.js** – Web framework
- **TypeScript** – Static typing
- **MongoDB** – NoSQL database
- **Mongoose** – MongoDB ORM
- **ts-node-dev** – Development server with hot reload
- **REST API principles**

---

## 🛠️ Getting Started

### 1. Clone the Repository

🔌 API Endpoints
📘 Book Routes
POST /api/books – Create a book

GET /api/books?filter=SCIENCE&sortBy=createdAt&sort=desc&limit=5 – Get books

PUT /api/books/:id – Update a book

DELETE /api/books/:id – Delete a book

🧑‍💻 Author
Ibrahim Rahamath Ullah

Level 2 Web Development Project

Guided by [Programming Hero Team]

📜 License
This project is licensed under the MIT License.



