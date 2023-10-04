import { models } from "../db.js";

export const getProductById = async (_, args) => {
    const { id } = args;

    try {
        const product = await models.Product.findOne({
            where: {
                idProduct: id
            }, include: [{
                model: models.Material
            },{
                model: models.Review
            }]
        });
        return product;
    } catch (error) {
        console.log(error.message);
    }
};