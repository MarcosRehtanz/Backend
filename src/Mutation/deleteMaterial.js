import { models } from "../db.js";

export const deleteMaterial = async (_, {id}) =>{
    try{
        const material = await models.Materials.findByPk(id)
        if(!material){
            throw Error('El material que desea eliminar no existe')
        }
        else{
            await material.destroy()
            return 'El material ha sido eliminado'
        }
    }
    catch(error){
        console.log(error, 'Soy el error del deleteMaterial')
        throw new Error('No se ha podido eliminar este material ' + error.message)
    }

}