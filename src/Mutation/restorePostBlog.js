import { models } from "../db.js";

export const restorePostBlog = async (_, args) =>{
   const {id, title} = args
   try{
        const restoredBlog = await models.Blog.restore({where:id})
        if(!restoredBlog){
            throw new Error('El blog que intenta restaurar no se encuentra')
        }
        else{
            return `El blog ${title} ha sido restaurado`
        }
   }
   catch(error){
        throw new Error ('Error al restaurar el blog' + error.message)
   }
}