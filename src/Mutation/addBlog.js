import { models } from "../db.js"

export const addBlog = async (_, args) => {

    try {

        const { title, description, date } = args
        if (!title || !description || !date) throw new Error("Faltan datos")

        const blog = await models.Blog.create({
            ...args
        })
        return ("Publicación creada con éxito")

    } catch (error) {
        throw new Error(error.message)
    }
}