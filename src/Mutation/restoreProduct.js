
//En prueba no usar, no tocar
//deletedAt se debe agregar a cada modelo.
export const restoreProduct = async (product) => {
    await product.setDataValue('deletedAt', null); 
    await product.save(); 
  };
  