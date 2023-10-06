
import { models } from "../db.js";

export const restoreUser = async (_, { idUser }) => {
  try {
    const restoredUser = await models.User.findByPk(idUser, { paranoid: false })

    if (!restoredUser) {
      throw new Error('Usuario no encontrado')
    }
    else {
      console.log(restoredUser, '¡He vuelto del más allá ciela!')
      return restoredUser
    }
  }
  catch (error) {
    throw new Error('Error al restaurar el usuario: ' + error.message);
  }
};
