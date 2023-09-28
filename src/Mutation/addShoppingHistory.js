import { models } from "../db.js"

export const addShoppingHistory = async (root, args) => {
    

    try {
        const { billDate, totalAmount } = args
        if(!billDate || !totalAmount) throw new Error (error.message)
        const [shoppingHistory, created] = await models.ShoppingHistory.findOrCreate({
            where: {
                billDate, totalAmount
            },
        })
        if(!shoppingHistory) throw new Error (error.message)
        return shoppingHistory

    } catch (error) {
        throw new Error (error.message)
    }
}