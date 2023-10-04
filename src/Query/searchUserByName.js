import { Op } from "sequelize"
import { models } from "../db.js";

export const searchUserByName = async (_, args) => {
    const { nameUser } = args;

    try {
        const user = await models.User.findAll({
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
                    },
                    {
                        email: {
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
