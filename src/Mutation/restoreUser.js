
import { models } from "../db.js";

export const restoreUser = async (_, { idUser, deletedAt }) => {
  try {
    const restoredUser = await models.User.update(
          {
            deletedAt
          },
          {where: {idUser}}
    )

  if(restoredUser){
      deletedAt = null
      const switchDeletedAt = await models.User.findByPk(idUser)
      console.log(switchDeletedAt, 'Aquí estoy de nuevo mi ciela')
      return switchDeletedAt
  }
  else{
    return 'El usuario ya ha sido restaurado'
  
  }
        
    }
       
   catch (error) {
    throw new Error('Error al restaurar el usuario: ' + error.message);
  }
};
