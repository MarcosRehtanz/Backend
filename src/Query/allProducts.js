import { models } from "../db.js"

export const allProducts = async(_, args) => {
    
    try {
        const product = await models.Product.findAll()
        if(!product) throw new Error (error.message)
        return product
    } catch (error) {
        throw new Error (error.message)
    }

}