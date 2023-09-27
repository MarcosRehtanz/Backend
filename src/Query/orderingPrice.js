import { models } from "../db.js"


export const orderingPrice = async (root, args) => {
    const { orderPrice, orderStock  } = args

    try {
        const product = await models.Product.findAll();
        if (orderStock){
            if (orderStock === "ASC") {
                product.sort((a, b) => {
                    if (a.stock < b.stock) return 1
                    if (b.stock < a.stock) return -1
                    if (a.stock === b.stock) {
                        return (orderPrice === "ASC") ? a.price - b.price : b.price - a.price;
                    }
                    return 0;
                });
            } else {
                product.sort((a, b) => {
                    if (a.stock < b.stock) return -1
                    if (b.stock < a.stock) return 1
                    if (a.stock === b.stock) {
                        return (orderPrice === "ASC") ? a.price - b.price : b.price - a.price;
                    }
                    return 0;
                });
            }
        }

        if (orderPrice === "ASC") {
            product.sort((a,b)=> a.price - b.price)
        } else {
            product.sort((a,b) => b.price - a.price)
        }

        return product
    } catch (error) {
        
    }

}