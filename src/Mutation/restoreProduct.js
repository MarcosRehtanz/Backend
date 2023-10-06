//Ya sirve wey @(*_*)@ 2.0

import { models } from "../db.js";

export const restoreProduct = async (_, { idProduct }) => {
  try {

    const restoredProduct = await models.Product.findByPk(idProduct, {paranoid: false})

  if(!restoredProduct){
    throw new Error ('Producto no encontrado')
  }
  else{
    console.log(restoredProduct, '¡He vuelto del más allá ciela!')
    return restoredProduct
  }
    }    
   catch (error) {
    console.error('Error al restaurar el producto:', error);
    throw new Error('Error al restaurar el producto: ' + error.message);
  }
};
