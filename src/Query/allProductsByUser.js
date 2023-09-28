import { models } from "../db.js"

export const allProductsByUser = async(_, args) => {
    
    try {
        const product = await models.Product.findAll()
        console.log(product, 'pasé por la función')
        return product
    } catch (error) {
        console.log(error, 'el error')
    }

}