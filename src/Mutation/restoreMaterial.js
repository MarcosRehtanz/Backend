import { models } from "../db.js";

export const restoreMaterial = async (_, { id }) => {
  try {

    const restoredMaterial = await models.Materials.findByPk(id, { paranoid: false })

    if (!restoredMaterial) {
      throw new Error('Material no encontrado')
    }
    else {
      console.log(restoredMaterial, '¡He vuelto del más allá ciela!')
      return restoredMaterial
    }
  } 
  catch (error) {
    console.error('Error al restaurar el material:', error);
    throw new Error('Error al restaurar el material: ' + error.message);
  }
};
