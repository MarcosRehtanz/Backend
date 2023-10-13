import { models } from "../db.js";

export const updateBlog = async (_, args) => {
    const { id,
        title,
        description,
         } = args;
        console.log(args);
    try{
        const blog = await models.Blog.update({
            title,
            description,
            
        },{where: {id} })

        if(!blog){
            throw new Error('el blog que intenta actualizar no ha sido encontrado. Verifique los datos')
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