
import { models } from "../db.js";

export const restoreSubmaterials = async (_, args) => {
  const { id, name } = args
  try {
    const restoredSubmaterials = await models.Submaterials.restore({where: id})

    if (!restoredSubmaterials) {
      throw new Error('Submaterial no encontrado')
    }
    else {
      return `${name} ha sido restaurado`
    }
  }
  catch(error) {
    throw new Error('Error al restaurar este submaterial: ' + error.message);
  }
};
