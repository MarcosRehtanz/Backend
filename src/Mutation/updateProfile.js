import { models } from "../db.js";

export const updateProfile = async (_, args) => {

    const { idProfile,
        userName,
        cuitCuil,
        phone,
        address,
        postalCode,
        description,
        typeUser,
        afipCondition,
        profilePicture } = args;
    const ifUserNameExist = await models.Profile.findOne({where:{userName}})
    if (ifUserNameExist) throw new Error ('El nombre de usuario que intenta utilizar ya fue usado por alguien mas')
    try {
        const updatedProfile = await models.Profile.update(
            {
                userName,
                cuitCuil,
                phone,
                address,
                postalCode,
                description,
                typeUser,
                afipCondition,
                profilePicture
            }, { where: {idProfile} }
        )
    if(!updatedProfile){
        throw new Error ('El usuario que intenta actualizar no se encuentra en la base de datos. Regístrate')
    }
    else{
        console.log(JSON.stringify(updatedProfile), "Se supone que me actualicé")
        const newProfileInfo = models.Profile.findByPk(idProfile)
        return newProfileInfo
    }

    }
    catch (error) {
        throw new Error('Error al actualizar el perfil' + error)
    }
}