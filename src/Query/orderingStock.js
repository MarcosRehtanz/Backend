import { models } from "../db.js"


export const orderingStock = async (root, args) => {
    const { orderStock, orderPrice } = args

    try {
        const product = await models.Product.findAll({ include: models.Material });
        if (orderPrice){
            if (orderStock === "ASC") {
                product.sort((a, b) => {
                    if (a.stock < b.stock) return -1
                    if (b.stock < a.stock) return 1
                    if (a.stock === b.stock) {
                        return (orderPrice === "ASC") ? a.price - b.price : b.price - a.price;
                    }
                    return 0;
                });
            } else {
                product.sort((a, b) => {
                    if (a.stock < b.stock) return 1
                    if (b.stock < a.stock) return -1
                    if (a.stock === b.stock) {
                        return (orderPrice === "ASC") ? a.price - b.price : b.price - a.price;
                    }
                    return 0;
                });
            }
        } else{
            if(orderStock === "ASC") {
                product.sort((a,b)=> a.stock - b.stock)
            } else {
                product.sort((a,b) => b.stock - a.stock)
            }
        }


        return product
    } catch (error) {
        
    }

}