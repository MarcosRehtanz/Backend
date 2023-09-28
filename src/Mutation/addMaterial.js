import { models } from "../db.js"

export const addMaterial = async (_, args) => {
   
    
    try {
        const { name, origen } = args
        if(!name || !origen) return new Error(error.message)
        
        await models.Material.findOrCreate({
            where: {
                name,
                origen
            },
        })
        const materialCreate = await models.Material.findOne({where:{name}})
        if(!materialCreate.dataValues) return new Error(error.message)
        return materialCreate.dataValues

    } catch (error) {
        console.log(error.message);
        return args
    }
}