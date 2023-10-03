import { models } from "../db.js";

export const deleteProduct = async (_, { id }) => {
  try {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw new Error('El producto que desea eliminar no existe');
    } else {
        
    }
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    throw new Error('Error al eliminar el producto: ' + error.message);
  }
};
