import { models } from "../db.js";

export const deleteProduct = async (_, {id}) =>{
    try{
        const product = await models.Product.findByPk(id)
        if(!product){
            throw Error('El producto que desea eliminar no existe')
        }
        else{
            await product.destroy()
            return 'El producto seleccionado fue eliminado exitosamente'
        }
    }
    catch(error){
        console.log(error, 'Soy el error del delete')
    }

}