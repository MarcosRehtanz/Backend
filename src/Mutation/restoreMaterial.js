import { models } from "../db.js";

export const restoreMaterial = async (_, args) => {
  const { id, name } = args
  try {

    const restoredMaterial = await models.Materials.restore({where: id})

    if (!restoredMaterial) {
      throw new Error('Material no encontrado')
    }
    else {
      console.log(restoredMaterial, '¡He vuelto del más allá ciela!')
      return `${name} ha sido resaurado`
    }
  } 
  catch (error) {
    console.error('Error al restaurar el material:', error);
    throw new Error('Error al restaurar el material: ' + error.message);
  }
};
