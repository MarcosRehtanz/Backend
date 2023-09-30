import { Op } from "sequelize"
import { models } from "../db.js";

export const searchProductByName = async (_, args) => {
    const { nameProduct } = args;

    try {
        const product = await models.Product.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${nameProduct}%`,
                }
            }, include: models.Material
        });

        return product;
    } catch (error) {
        console.log(error.message);
    }
};
