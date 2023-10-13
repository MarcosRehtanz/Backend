import { models } from "../db";

export const allRestoredUser = async ()=> {
   try{
    const restoredUsers = await models.User.findAll({ paranoid: false })
    if(!restoredUsers){
        return 'No se encontraron usuarios'
    }
    else{
        const allRestoredUsrs = restoredUsers.map(user =>{
            return{
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
            return allRestoredUsrs
        }
   }
   catch(error){
    throw new Error ('No se pudo realizar la consulta. Intente más tarde' + error.message)
   }
}
