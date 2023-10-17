import { models } from "../db.js";

export const restoreMaterial = async (_, args) => {
  const { id } = args
  try {

    const restoredMaterial = await models.Materials.restore({where: {
      id
    }})

    if (!restoredMaterial) {
      throw new Error('Material no encontrado')
    }
    else {
      console.log(restoredMaterial, '¡He vuelto del más allá ciela!')
      return "La categoría ha sido resaurada"
    }
  } 
  catch (error) {
    console.error('Error al restaurar el material:', error);
    throw new Error('Error al restaurar el material: ' + error.message);
  }
};
