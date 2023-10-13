import { models } from "../db.js"

export const banProfile = async (_, args) => {
    const {cuitCuil, username, idProfile} = args
    const user = await models.Profile.findByPk(idProfile);
console.log(user?.dataValues);
try{
    if(!user){
        throw new Error ('Este perfil no se encuentra en la base de datos')
    }else if(user?.dataValues?.isBan === null || user?.dataValues?.isBan === false){
        await models.Profile.update(
            { isBan: true },
            { where: { cuitCuil } }
          )
          return {message: `El perfil ${username} ha sido baneado`}
    }else if(user?.dataValues?.isBan === true){
        await models.Profile.update(
            { isBan: false },
            { where: { cuitCuil } }
          )
          return {message: `El perfil ${username} ha sido activado`}
        }
      
}
catch(error){
    throw new Error ('Error al banear este usuario' + error.message)
}

}