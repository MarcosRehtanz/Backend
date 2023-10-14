
import { models } from "../db.js";

export const restoreUser = async (_, args) => {
 const { idUser, name } = args
  try {
    const restoredUser = await models.User.restore({ where:{idUser} })

    if (!restoredUser) {
      throw new Error('Usuario no encontrado')
    }
    else {
      return `Este usuario ${name} ha sido resaurado`
    }
  }
  catch (error) {
    throw new Error('Error al restaurar el usuario: ' + error.message);
  }
};
