import express from "express"
import { authguard } from "../services/authguard.js"
import { addBook, deleteBook, updateBook } from "../controllers/bookController.js"

export const bookRouter = express.Router()

bookRouter.post("/add", authguard, addBook)
bookRouter.post("/:id/update", authguard, updateBook)
bookRouter.post("/:id/delete", authguard, deleteBook)