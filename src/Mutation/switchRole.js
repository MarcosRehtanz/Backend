import { models } from "../db.js";

export const switchRole = async (_, args) =>{
    const {idUser} = args;
    const user = await models.User.findByPk(idUser);
    try{
        if(!user){
            throw new Error("No existe el usuario");
        }
        else if (user.role === 'user'){
            await user.update({role: 'admin'}, {where: {idUser} });
            return `${user.name + ' ' + user.lastname} actualizó su rol a admin` 
        }
        else{
            await user.update({role:'user'})
            return `${user.name + ' ' + user.lastname} actualizó su rol a user` 
        }
    }
    catch(error){
        throw new Error ('No se pudo cambiar el rol' + error.message)
    }

}
