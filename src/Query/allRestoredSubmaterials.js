import { models } from "../db.js";

export const allRestoredSubmaterials = async () =>{
    try {
        const restoredSubmaterials = await models.Submaterials.findAll({where: { [Op.not]: {deletedAt: null}}, paranoid: false});
        return restoredSubmaterials
}
catch(error){
    throw new Error ('Error 500 - No se pudo cargar lista de submateriales' + error.message)
}
}