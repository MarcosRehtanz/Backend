
import { models } from "../db.js";

export const allRestoredBlogs = async () => {
    try{
        const restoredBlogs = await models.Blog.findAll({where: { [Op.not]: {deletedAt: null}}, paranoid: false})
        return restoredBlogs
    }
    catch(error){
        throw new Error ('Error 500 - No se pudo cargar la lista de blogs ' + error.message)
    }
}