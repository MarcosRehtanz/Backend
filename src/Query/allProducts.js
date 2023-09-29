import { models } from "../db.js"

export const allProducts = async(_, args) => {
    
    try {
        const product = await models.Product.findAll({
            include: [{
                model: models.Material
            }]
        })
        if(!product) throw new Error (error.message)
        // console.log(product);
        return product
    } catch (error) {
        throw new Error (error.message)
    }

}