import { models } from "../db.js"


export const orderingStock = async (root, args) => {
    const { orderStock, orderPrice } = args

    try {
        const product = await models.Product.findAll();
        if (orderPrice){
            if (orderPrice === "ASC") {
                product.sort((a, b) => {
                    if (a.price < b.price) return 1
                    if (b.price < a.price) return -1
                    if (a.price === b.price) {
                        return (orderStock === "ASC") ? a.stock - b.stock : b.stock - a.stock;
                    }
                    return 0;
                });
            } else {
                product.sort((a, b) => {
                    if (a.price < b.price) return -1
                    if (b.price < a.price) return 1
                    if (a.price === b.price) {
                        return (orderStock === "ASC") ? a.stock - b.stock : b.stock - a.stock;
                    }
                    return 0;
                });
            }
        }

        if(orderStock === "ASC") {
            product.sort((a,b)=> a.stock - b.stock)
        } else {
            product.sort((a,b) => b.stock - a.stock)
        }

        return product
    } catch (error) {
        
    }

}