import { models } from "../db.js"


export const filteringMaterial = async (root, args) => {
    const { idMaterial } = args

    try {
        const product = await models.Product.findAll({ where: {
            MaterialId: idMaterial
        } });

        return product
    } catch (error) {

    }

}