import express from "express"
import "dotenv/config"
import { userRouter } from "./routes/userRouter.js"
import { bookRouter } from "./routes/bookRouter.js"
import session from "express-session"

const app = express()

app.use(session({
    // Secret à mettre dans le .env
    secret: 'r56htjr4*t$^pkojihugzjvfebjdkpoiuyh',
    resave: true,
    saveUninitialized: true
}))
app.use(express.urlencoded({extended:true}))

app.use(userRouter)
app.use("/books", bookRouter)

app.listen(process.env.PORT, (error)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log(`Connecté sur le port ${process.env.PORT}`);
    }
})