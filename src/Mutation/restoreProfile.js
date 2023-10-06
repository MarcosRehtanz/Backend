
import { models } from "../db.js";

export const restoreProfile = async (_, { idProfile }) => {
  try {
    const restoredProfile = await models.Profile.findByPk(idProfile, { paranoid: false })

    if (!restoredProfile) {
      throw new Error('Peril no encontrado')
    }
    else {
      console.log(restoredProfile, '¡He vuelto del más allá ciela!')
      return restoredProfile
    }
  }
  catch (error) {
    throw new Error('Error al restaurar el perfil: ' + error.message);
  }
};
