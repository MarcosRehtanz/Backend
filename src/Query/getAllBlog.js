import { models } from "../db.js"

export const getAllBlog = async () => {
    try {

        const allPublications = await models.Blog.findAll()
        return allPublications

    } catch (error) {

        throw new Error(error.message)
    }
}