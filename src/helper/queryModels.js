import { models } from "../db.js"

export async function allProductsMaterials() {
    let result = await models.Product.findAll({ include: [models.Materials, models.SubMaterials] });
    return result;
}