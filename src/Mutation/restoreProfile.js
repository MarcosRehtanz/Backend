
import { models } from "../db.js";

export const restoreProfile = async (_, args) => {
  const { idProfile, username } = args
  try {
    const restoredProfile = await models.Profile.restore({where: idProfile})
    if (!restoredProfile) {
      throw new Error('Peril no encontrado')
    }
    else {
      return `El usuario ${username} ha sido restaurado`
    }
  }
  catch (error) {
    throw new Error('Error al restaurar el perfil: ' + error.message);
  }
};
