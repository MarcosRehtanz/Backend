import { models } from "../db.js";
import { uploadProductImg } from "./uploadProductImg.js";

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
    const ifUserNameExist = await models.Profile.findOne({ where: { userName } })
    // console.log(ifUserNameExist);
    if (ifUserNameExist && ifUserNameExist.idProfile !== idProfile) throw new Error(`"${userName}" no se encuentra disponible`)
    try {
        const urlImage = await uploadProductImg(profilePicture)
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
                profilePicture: urlImage,
                role: "user"
            }, { where: { idProfile } }
        )
        if (!updatedProfile) {
            throw new Error('El usuario que intenta actualizar no se encuentra en la base de datos. Regístrate')
        }
        else {
            // console.log(JSON.stringify(updatedProfile), "Se supone que me actualicé")
            const newProfileInfo = await models.Profile.findByPk(idProfile)
            return newProfileInfo
        }

    }
    catch (error) {
        throw new Error('Error al actualizar el perfil' + error)
    }
}