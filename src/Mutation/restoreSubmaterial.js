
import { models } from "../db.js";

export const restoreSubmaterials = async (_, { id }) => {
  try {
    const restoredSubmaterials = await models.Submaterials.findByPk(id, { paranoid: false })

    if (!restoredSubmaterials) {
      throw new Error('Submaterial no encontrado')
    }
    else {
      console.log(restoredSubmaterials, '¡He vuelto del más allá ciela!')
      return restoredSubmaterials
    }
  }
  
  catch(error) {
    throw new Error('Error al restaurar este submaterial: ' + error.message);
  }
};
