//Ya sirve wey @(*_*)@ 2.0

import { models } from "../db.js";

export const restoreProduct = async (_, args) => {
  const { idProduct } = args
  try {

    const restoredProduct = await models.Product.restore({where: {
      idProduct
    }})

  if(!restoredProduct){
    throw new Error ('Producto no encontrado')
  }
  else{
    return `El producto ha sido resaurado`
  }
    }    
   catch (error) {
    console.error('Error al restaurar el producto:', error);
    throw new Error('Error al restaurar el producto: ' + error.message);
  }
};
