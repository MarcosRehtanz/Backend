import { models } from "../db.js";

export const restorePostBlog = async (_, args) =>{
   const {id} = args
   try{
        const restoredBlog = await models.Blog.findByPk(id, {paranoid: false})
        if(!restoredBlog){
            throw new Error('El blog que intenta restaurar no se encuentra')
        }
        else{
            return restoredBlog
        }
   }
   catch(error){
        throw new Error ('Error al restaurar el blog' + error.message)
   }
}