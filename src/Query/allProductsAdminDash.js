import { models } from "../db.js"


export const allProductsAdminDash = async() => {
    
    try {
        const allProducts = await models.Product.findAll(
            {
                include: models.Review
            }
        )
        return allProducts
    } catch (error) {
        throw new Error ('No se pudo cargar el total de productos ' + error.message)
    }
}