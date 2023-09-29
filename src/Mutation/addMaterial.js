import { models } from "../db.js"

export const addMaterial = async (_, args) => {
   
    
    try {
        const { name, origen, image } = args
        if(!name || !origen || !image) return new Error(error.message)
        
        const mat = await models.Material.findOne({where:{name}})
        if (mat) return new Error (error.message)
        const material = await models.Material.findOrCreate({
            where: {
                name,
                origen,
                image
            },
        })
        if(!material.dataValues) return new Error(error.message)
        return material.dataValues

    } catch (error) {
        console.log(error.message);
        return args
    }
}