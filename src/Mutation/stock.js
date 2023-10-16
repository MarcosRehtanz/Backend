import {models} from '../db.js';

export const stock = async ( args) => {
    try {
        const { idProduct, quantity } = args
        const product = await models.Product.findOne({ where: { idProduct } })
        if (!product) throw new Error("El producto no existe")
        const stock = product.stock
        if (stock < quantity) throw new Error("No hay suficiente stock")
        const newStock = stock - quantity
        await models.Product.update({ stock: newStock }, { where: { idProduct } })
        if (stock === quantity){
        await models.Product.destroy({ where: { idProduct } })}
        return "Stock actualizado"
    } catch (error) {
        throw new Error(error.message);
    }

}