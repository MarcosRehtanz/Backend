import { models } from "../db.js";

export const allRestoredSubmaterials = async () =>{
    try {
        const restoredSubmaterials = await models.Submaterials.findAll({where: {paranoid : false}});
        return restoredSubmaterials
}
catch(error){
    throw new Error ('Error 500 - No se pudo cargar lista de submateriales' + error.message)
}
}