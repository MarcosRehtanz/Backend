
import { models } from "../db.js";

export const restoreUser = async (_, { idUser }) => {
  try {
    const restoredUser = await models.User.restore({ where:{idUser} })
    // const restoredUser = await models.User.findByPk(idUser, { paranoid: false })
    // const restoredUsers = await models.User.findAll({ paranoid: false })
    // console.log(restoredUsers.map(u => u.dataValues));
    if (!restoredUser) {
      throw new Error('Usuario no encontrado')
    }
    else {
      // console.log(restoredUser);
      // await models.User.create({...restoredUser.dataValues})
      console.log(restoredUser, '¡He vuelto del más allá ciela!')
      return `${idUser} ha sido resaurado con exito`
    }
  }
  catch (error) {
    throw new Error('Error al restaurar el usuario: ' + error.message);
  }
};
