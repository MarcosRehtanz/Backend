import { models } from "../db.js"

export const allRestoredMaterials = async() => {
    
    try {
        const restoredMaterials = await models.Materials.findAll({where: { [Op.not]: {deletedAt: null}}, paranoid: false})
        return restoredMaterials
    } catch (error) {
        throw new Error ('Error 500 - No se pudo cargar la lista de materiales' + error.message)
    }
}