import { models } from "../db.js";

export const deleteUser = async (_, {id}) =>{
    try{
        const user = await models.User.findByPk(id)
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
    }

}