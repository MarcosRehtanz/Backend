import { models } from "../db.js";

export const deleteProfile = async (_, { idProfile }) => {
  try {
    const profile = await models.Profile.findByPk(idProfile);
    if (!profile) {
      throw new Error('El perfil que desea eliminar no existe');
    } else {
        
    }
  } catch (error) {
    throw new Error('Error al eliminar este perfil: ' + error.message);
  }
};
