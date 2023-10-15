import { Op } from "sequelize";
import { models } from "../db.js";

export const allResProductsByUser = async (_, args) => {
    try {
        const { id } = args;
        if (!id)
            throw new UserInputError("Debe proporcionar un ID", {
                invalidArgs: id,
            });
        const product = await models.Product.findAll({ where: { [Op.not]: { deletedAt: null }, UserIdUser: id }, paranoid: false });

        return product;
    } catch (error) {
        console.log(error, "el error");
    }
};
