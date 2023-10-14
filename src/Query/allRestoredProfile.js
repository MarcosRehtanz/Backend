import { models } from "../db.js";

export const allRestoredProfile = async () => {
    try{
        const restoredProfiles = await models.Profile.findAll({where: {paranoid: false}})
        return restoredProfiles;
    }
    catch(error){
        throw new Error ('Error 500 - No se pudo cargar la lista de perfiles '+ error.message)
    }
}