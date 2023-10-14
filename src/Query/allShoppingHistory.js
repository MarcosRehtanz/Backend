import { models } from "../db.js"


export const allShoppingHistory = async() => {
    
    try {
        const shoppingHistory = await models.ShoppingHistory.findAll()
        return shoppingHistory
    } catch (error) {
        throw new Error('No se pudo cargar los historiales de compra ' + error.message)
    }

}