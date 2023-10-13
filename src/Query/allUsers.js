import { models } from "../db.js"


export const allUsers = async() => {
    
    try {
        
        const users = await models.User.findAll(
            {
                include: models.Profile
            }
        )
        if(!users) throw new Error ("No se encontraron usuarios")

        const AllUsers = users.map(usuario =>{
            
            return {
                    idUser: usuario.dataValues.idUser,
                    name: usuario.dataValues.name,
                    lastname: usuario.dataValues.lastname,
                    email:usuario.dataValues.email,
                    password: usuario.dataValues.password,
                    acountActive: usuario.dataValues.acountActive,
                    termsAndCondsAprove: usuario.dataValues.termsAndCondsAprove,
                    createdAt: String(usuario.dataValues.createdAt),
                    updatedAt: String(usuario.dataValues.updatedAt),
                    deletedAt: usuario.dataValues.deletedAt,
                    profile: usuario.dataValues.Profile.dataValues,
                    role:usuario.dataValues.role
                }
                
            }
        )
    
        return AllUsers

    } catch (error) {
        throw new Error (error.message)
    }

}