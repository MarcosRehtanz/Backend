import { models } from "../db.js"


export const allCarts = async() => {
    
    try {
        const cart = await models.Cart.findAll()
        return cart
    } catch (error) {
        
    }

}