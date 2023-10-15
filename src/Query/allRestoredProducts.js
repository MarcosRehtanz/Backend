import { Op } from "sequelize";
import { models } from "../db.js"

export const allResProducts = async() => {
    
    try {
        const allProducts = await models.Product.findAll({where: { [Op.not]: {deletedAt: null}}, paranoid: false})
        return allProducts
    } catch (error) {
        throw new Error ('Error 500 - No se pudo cargar la lista de productos' + error.message)
    }
}