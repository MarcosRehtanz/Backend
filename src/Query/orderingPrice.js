import { models } from "../db.js"


export const orderingPrice = async (root, args) => {
    const { orderPrice, orderStock } = args

    try {
        const product = await models.Product.findAll();
        if (orderStock) {
            if (orderPrice === "ASC") {
                product.sort((a, b) => {
                    if (a.price < b.price) return -1
                    if (b.price < a.price) return 1
                    if (a.price === b.price) {
                        return (orderStock === "ASC") ? a.stock - b.stock : b.stock - a.stock;
                    }
                    return 0;
                });
            } else {
                product.sort((a, b) => {
                    if (a.price < b.price) return 1
                    if (b.price < a.price) return -1
                    if (a.price === b.price) {
                        return (orderStock === "ASC") ? a.stock - b.stock : b.stock - a.stock;
                    }
                    return 0;
                });
            }
        } else {
            if (orderPrice === "ASC") {
                product.sort((a, b) => a.price - b.price)
            } else {
                product.sort((a, b) => b.price - a.price)
            }
        }


        return product
    } catch (error) {

    }

}