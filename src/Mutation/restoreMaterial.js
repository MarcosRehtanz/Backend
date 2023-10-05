import { models } from "../db.js";

export const restoreMaterial = async (_, { id, deletedAt }) => {
  try {
    const restoredMaterial = await models.Material.update(
          {
            deletedAt
          },
          {where: {id}}
    )

  if(restoredMaterial){
      deletedAt = null
      const switchDeletedAt = await models.Material.findByPk(id)
      console.log(switchDeletedAt, 'Aquí estoy de nuevo mi ciela')
      return switchDeletedAt
  }
  else{
    return 'Este material ya ha sido restaurado'
  
  }
        
    }
       
   catch (error) {
    console.error('Error al restaurar el material:', error);
    throw new Error('Error al restaurar el material: ' + error.message);
  }
};
