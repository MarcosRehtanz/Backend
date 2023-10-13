import { errorMonitor } from "nodemailer/lib/xoauth2";
import { models } from "../db";

export const updateBlog = async (_, args) => {
    const { id,
        title,
        description,
        date } = args;

    try{
        const blog = await models.blog.update({
            title,
            description,
            date
        },{where: {id} })

        if(!blog){
            throw new Error('el blo que intenta actualizar no ha sido encontrado. Verifique los datos')
        }
        else{
            const newBlogInfo = await models.Blog.findByPk(id)
            return newBlogInfo
        }
    }
    catch(error){
        throw new Error ('Error al actualizar el blog'+ error.message)
    }
} 