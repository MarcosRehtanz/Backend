
//En prueba no usar, no tocar
//deletedAt se debe agregar a cada modelo.
import { models } from "../db.js";

const restoreUtils = async (product) => {
    await product.setDataValue('deletedAt', null); 
    await product.save(); 
  };
  
  export const restoreProduct = async (_, { id }) => {
    try {
      const product = await models.Product.findByPk(id);

      if (!product) {
        throw new Error('El producto que desea restaurar no existe');
      } else {
        
        await restoreUtils(product);

        return 'El producto seleccionado fue restaurado exitosamente';
      }
    } catch (error) {
      throw new Error('Error al restaurar el producto: ' + error.message);
    }
  }
