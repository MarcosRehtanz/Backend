import { models } from "../db.js";
import { Op } from "sequelize";

export const allRestoredUser = async () => {
    try {
        const restoredUsers = await models.User.findAll({ where: { [Op.not]: { deletedAt: null } }, paranoid: false, include: models.Profile })
        if (!restoredUsers) {
            return 'No se encontraron usuarios'
        }
        else {
            const allRestoredUsrs = restoredUsers.map(usuario => {
                console.log(usuario?.dataValues.name);
                return {
                    idUser: usuario.dataValues.idUser,
                    name: usuario.dataValues.name,
                    lastname: usuario.dataValues.lastname,
                    email: usuario.dataValues.email,
                    password: usuario.dataValues.password,
                    acountActive: usuario.dataValues.acountActive,
                    termsAndCondsAprove: usuario.dataValues.termsAndCondsAprove,
                    createdAt: String(usuario.dataValues.createdAt),
                    updatedAt: String(usuario.dataValues.updatedAt),
                    deletedAt: usuario.dataValues.deletedAt,
                    profile: usuario.dataValues.Profile,
                    role: usuario.dataValues.role
                }
            }
            )
            return allRestoredUsrs
        }
    }
    catch (error) {
        throw new Error('No se pudo realizar la consulta. Intente más tarde' + error.message)
    }
}
