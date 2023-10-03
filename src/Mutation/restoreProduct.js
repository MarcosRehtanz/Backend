
//En prueba no usar, no tocar
//deletedAt se debe agregar a cada modelo.
import { models } from "../db.js";

export const restoreProduct = async (_, { id }) => {
  try {
    const product = await models.Product.findByPk(id);

    if (!product) {
      throw new Error('El producto que desea restaurar no existe o ha sido eliminado');
    }
    else{
        
    }

    return 'El producto seleccionado fue restaurado exitosamente';
  } catch (error) {
    console.error('Error al restaurar el producto:', error);
    throw new Error('Error al restaurar el producto: ' + error.message);
  }
};
