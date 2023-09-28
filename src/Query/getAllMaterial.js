import { models } from "../db.js"

export const getAllMaterial = async()=>{
    try {
       const material = await models.Material.findAll()
       console.log(material);
       if(!material) return new Error ("No hay materiales en la base de datos")
       return material 
    } catch (error) {
        return(error.message)
    }
}