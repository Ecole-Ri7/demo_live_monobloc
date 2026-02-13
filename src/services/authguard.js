import { PrismaClient } from "../generated/prisma/client.js";
import { adapter } from "../../prisma/adapter.js";
const prisma = new PrismaClient({ adapter })

export async function authguard(req, res, next){
    try {
        if(req.session.user){
            const user = await prisma.user.findUnique({
                select:{
                    id:true,
                    firstName:true,
                    lastName:true,
                    mail:true
                },
                where:{
                    id: req.session.user
                }
            })
            if(user){
                req.user = user
                return next()
            }
            else{
                throw new Error("L'utilisateur a été supprimé de la base de données")
            }
        }
        else{
            throw new Error("Aucun utilisateur enregistré en session")
        }
    } catch (error) {
        console.log(error);
        res.redirect("/login")
    }
}