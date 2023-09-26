import { models } from "../db.js"

export const addCart = async (root, args) => {
    const { quantity } = args

    try {
        const [cart, created] = await models.Cart.findOrCreate({
            where: {
                quantity
            },
        })
        
        return cart

    } catch (error) {
        console.log(error.message);
        return args
    }
}