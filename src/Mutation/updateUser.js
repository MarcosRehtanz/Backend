import { models } from "../db.js";

export const updateUser = async (_, args) => {

    const { idUser,
        name,
        lastname,
        email,
        password,
        acountActive,
        termsAndCondsAprove
        } = args;

    try {
        const updatedUser = await models.User.update(
            {
                name,
                lastname,
                email,
                password,
                acountActive,
                termsAndCondsAprove
            }, { where: {idUser} }
        )
    if(!updatedUser){
        throw new Error ('El usuario que intenta actualizar no se encuentra en la base de datos. Regístrate')
    }
    else{
        const newUserInfo = models.User.findByPk(idUser)
        return newUserInfo
    }

    }
    catch (error) {
        throw new Error('Error al actualizar el usuario' + error)
    }
}