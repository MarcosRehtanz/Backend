import { models } from "../db.js"

export const banProfile = async (_, args) => {
    const {cuitCuil, username} = args
try{
    const [banedProfile] = await models.Profile.update(
        { isBan: true },
        { where: { cuitCuil } }
      )
    if(!banedProfile){
        throw new Error ('Este perfil no se encuentra en la base de datos')
    }
    return `El perfil ${username} ha sido baneado`
}
catch(error){
    throw new Error ('Error al banear este usuario' + error.message)
}

}