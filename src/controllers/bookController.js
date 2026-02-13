import { PrismaClient } from "../generated/prisma/client.js";
import { adapter } from "../../prisma/adapter.js";
const prisma = new PrismaClient({ adapter });

export async function home(req, res) {
    try {
        // Récupère tous les livres en base de données
        const books = await prisma.book.findMany()
        // Affiche la page d'accueil en lui envoyant la liste des livres
        res.render("pages/home.twig", {
            books
        })
    } catch (error) {
        // Affiche l'erreur dans la console
        console.log(error);
        // Affiche la page avec l'erreur
        res.render("pages/home.twig", {
            error: "Erreur lors de la récupération des livres"
        })
    }
}

export async function addBook(req, res) {
    try {
        const { title, author } = req.body
        await prisma.book.create({
            data: {
                title,
                author,
                userId: req.session.user
            }
        })
        res.redirect("/")
    } catch (error) {
        console.log(error);
        res.render("pages/home.twig", {
            error: "Erreur lors de la création d'un livre"
        })
    }
}

export async function deleteBook(req, res) {
    try {
        await prisma.book.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })
        res.redirect("/")
    } catch (error) {
        console.log(error);
        res.render("pages/home.twig", {
            error: "Erreur lors de la suppression d'un livre"
        })
    }
}


export async function updateBook(req, res) {
    try {
        const { title, author } = req.body
        await prisma.book.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                title,
                author,
            }
        })
        res.redirect("/")
    } catch (error) {
        console.log(error);
        res.render("pages/home.twig", {
            error: "Erreur lors de la modification d'un livre"
        })
    }
}