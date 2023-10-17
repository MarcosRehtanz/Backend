import { Op } from "sequelize"
import { models } from "../db.js";

export const searchUserByName = async (_, args) => {
    const { nameUser } = args;

    try {
        // Busca apellido y nombre de usuarios
        let user = await models.User.findAll({
            where: {
                [Op.or]: [
                    {
                        name: {
                            [Op.iLike]: `%${nameUser}%`,
                        },
                    },
                    {
                        lastname: {
                            [Op.iLike]: `%${nameUser}%`,
                        },
                    }   
                ]
            }, include: models.Product
        });

        return user;
    } catch (error) {
        console.log(error.message);
    }
};
