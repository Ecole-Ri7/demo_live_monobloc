import express from "express"
import { authguard } from "../services/authguard.js"
import { addBook, deleteBook, home } from "../controllers/bookController.js"

export const bookRouter = express.Router()

bookRouter.post("/add", authguard, addBook)
bookRouter.post("/:id/delete", authguard, deleteBook)