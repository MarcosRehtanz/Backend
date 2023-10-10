import { models } from "../db.js";

export const switchRole = async (_, args) =>{
    const {idUser} = args;
    const user = await models.user.findByPk(idUser);
    try{
        if(!user){
            throw new Error("No existe el usuario");
        }
        else if (user.role === 'user'){
            return user.update({role: 'admin'});
        }
        else{
            return user.update({role:'user'})
        }
    }
    catch(error){
        throw new Error ('No se pudo cambiar el rol' + error.message)
    }

}
