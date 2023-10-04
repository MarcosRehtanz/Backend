import { models } from "../db.js"

export const addMaterial = async (_, args) => {
   
    
    try {
        const { name, origen, image } = args
        if(!name || !origen || !image) return new Error("Faltan datos bichi")
        
        const mat = await models.Material.findOne({where:{name}})
        if (mat) throw new Error ("El material ya esta creado")
        const material = await models.Material.create({
                name,
                origen,
                image
        })
        console.log(material.dataValues);
        if(!material.dataValues) return new Error("No se pudo crear el material")
        return material.dataValues

    } catch (error) {
            throw new Error(error.message);
    }
}