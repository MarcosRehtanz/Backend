import { models } from "../db.js"

export const allSubmaterial = async()=>{
    try {
       const submaterial = await models.SubMaterials.findAll()
       if(!submaterial) return new Error ("No hay submateriales en la base de datos")
       return submaterial 
    } catch (error) {
        return(error.message)
    }
}