import { models } from "../db.js";

export const deleteSubMaterial = async (_, { id }) => {
  try {
    const subMaterial = await models.SubMaterials.findByPk(id);
    if (!subMaterial) {
      throw new Error('El subMaterial que desea eliminar no existe');
    } else {
        
    }
  } catch (error) {
    throw new Error('Error al eliminar este subMaterial: ' + error.message);
  }
};
