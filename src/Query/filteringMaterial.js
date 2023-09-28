import { models } from "../db.js"


export const filteringMaterial = async (root, args) => {
    const { idMaterial } = args

    try {
        const product = await models.Product.findAll({ MateraialId: idMaterial });

        return product
    } catch (error) {

    }

}