import { models } from "../db.js"


export const allShoppingHistory = async() => {
    
    try {
        const shoppingHistory = await models.ShoppingHistory.findAll({include: models.BuyOrders})
        // console.log(shoppingHistory[0].dataValues.BuyOrders)
        return shoppingHistory.map(shop => {
            return {
                ...shop.dataValues, buyOrders: shop.dataValues.BuyOrders
            }
        })
    } catch (error) {
        throw new Error('No se pudo cargar los historiales de compra ' + error.message)
    }

}