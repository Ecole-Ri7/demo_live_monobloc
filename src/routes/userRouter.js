import express from "express"
import { getLogin, getRegister, postLogin, postRegister } from "../controllers/userController.js"
import { home } from "../controllers/bookController.js"
import { authguard } from "../services/authguard.js"

export const userRouter = express.Router()

userRouter.get("/", authguard, home)
userRouter.get("/register", getRegister)
userRouter.post("/register", postRegister)
userRouter.get("/login", getLogin)
userRouter.post("/login", postLogin)