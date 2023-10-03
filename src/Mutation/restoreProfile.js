
import { models } from "../db.js";

export const restoreProfile = async (_, { idProfile, deletedAt }) => {
  try {
    const restoredProfile = await models.Profile.update(
          {
            deletedAt
          },
          {where: {idProfile}}
    )

  if(restoredProfile){
      deletedAt = null
      const switchDeletedAt = await models.Product.findByPk(idProfile)
      console.log(switchDeletedAt, 'Aquí estoy de nuevo mi ciela')
      return switchDeletedAt
  }
  else{
    return 'Hemos recuperado tu perfil'
  
  }
        
    }
       
   catch (error) {
    throw new Error('Error al restaurar el perfil: ' + error.message);
  }
};
