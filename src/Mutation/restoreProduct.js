
//Ya sirve wey (*_*)

import { models } from "../db.js";

export const restoreProduct = async (_, { idProduct, deletedAt }) => {
  try {
    const restoredProduct = await models.Product.update(
          {
            deletedAt
          },
          {where: {idProduct}}
    )

  if(restoredProduct){
      deletedAt = null
      const switchDeletedAt = await models.Product.findByPk(idProduct)
      console.log(switchDeletedAt, 'Aquí estoy de nuevo mi ciela')
      return switchDeletedAt
  }
  else{
    return 'Este producto ya ha sido restaurado'
  
  }
        
    }
       
   catch (error) {
    console.error('Error al restaurar el producto:', error);
    throw new Error('Error al restaurar el producto: ' + error.message);
  }
};
