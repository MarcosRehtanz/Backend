import { models } from "../db.js"

export const addProduct = async (root, args) => {
    const { name, description, price, stock, publicationDate, productImage } = args

    try {
        const [product, created] = await models.Product.findOrCreate({
            where: {
                name,
                description,
                price,
                stock, 
                publicationDate,
                productImage
            },
        })
        
        return product

    } catch (error) {
        console.log(error.message);
        return args
    }
}