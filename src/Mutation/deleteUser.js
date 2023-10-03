import { models } from "../db.js";

export const deleteUser = async (_, {idUser}) =>{
    try{
        const user = await models.User.findByPk(idUser)
        if(!user){
            throw Error('El user que desea eliminar no existe')
        }
        else{
            await user.destroy()
            return 'El user seleccionado fue eliminado exitosamente'
        }
    }
    catch(error){
        console.log(error, 'Soy el error del deleteUser')
        throw new Error('No se ha podido eliminar este usuario ' + error.message)
    }

}