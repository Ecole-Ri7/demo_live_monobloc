import { PrismaClient } from "../generated/prisma/client.js";
import { adapter } from "../../prisma/adapter.js";
import { hashPasswordExtension } from "../../prisma/extensions/hashPassword.js";
const prisma = new PrismaClient({ adapter }).$extends(hashPasswordExtension);
import bcrypt from "bcrypt"

export function getRegister(req, res){
    res.render("pages/register.twig", {
        title: "Inscription"
    })
}

export async function postRegister(req, res){
    try{
        const {firstName, lastName, mail, password} = req.body;
        await prisma.user.create({
            data:{
                firstName,
                lastName,
                mail,
                password
            }
        })
        res.redirect("/login")
    }
    catch(error){
        console.log(error);
        res.render("pages/register.twig", {
            title: "Inscription",
            error:"Erreur lors de l'inscription..."
        })
    }
}

export function getLogin(req, res){
    res.render("pages/login.twig",{
        title:"Connexion"
    })
}

export async function postLogin(req, res){
    try {
        // Récupérer l'utilisateur par son mail
        const user = await prisma.user.findUnique({
            where:{
                mail:req.body.mail
            }
        })
        if(user){
            // Vérifier la concordance des mots de passe
            if(await bcrypt.compare(req.body.password, user.password)){
                // Garder en mémoire l'utilisateur
                req.session.user = user.id
                // Rediriger vers la page d'accueil si ok
                res.redirect("/")
            }
            else{
                throw new Error("Mot de passe invalide")
            }
        }
        else{
            throw new Error("Mail invalide")
        }
    } catch (error) {
        console.log(error);
        res.render("pages/login.twig",{
            error:"Identifiants invalides"
        })
    }
}