import { models } from "../db.js"

export async function allProductsMaterials(limit=12, offset=0) {
    let result = await models.Product.findAll({
        include: [models.Materials, models.SubMaterials], 
        limit,
        offset, 
    });
    return result;
}