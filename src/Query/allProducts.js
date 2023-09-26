import { models } from "../db.js"


export const allProducts = async() => {
    
    try {
        const product = await models.Product.findAll()
        return product
    } catch (error) {
        
    }

}