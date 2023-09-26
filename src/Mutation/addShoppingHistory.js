import { models } from "../db.js"

export const addShoppingHistory = async (root, args) => {
    const { billDate, totalAmount } = args

    try {
        const [shoppingHistory, created] = await models.ShoppingHistory.findOrCreate({
            where: {
                billDate, totalAmount
            },
        })
        
        return shoppingHistory

    } catch (error) {
        console.log(error.message);
        return args
    }
}