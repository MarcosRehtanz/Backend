import { models } from "../db.js"


export const allProductsAdminDash = async() => {
    
    try {
        const allProducts = await models.Product.findAll()
        return allProducts
    } catch (error) {
        throw new Error ('No se pudo cargar el total de productos ' + error.message)
    }
}