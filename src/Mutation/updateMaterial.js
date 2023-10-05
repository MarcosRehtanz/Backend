import { models } from "../db.js";

export const updateMaterial = async (_, args) => {

    const { id,
        name,
        origin,
        image,
        } = args;

    try {
        const updatedMaterial = await models.Material.update(
            {
                name,
                origin,
                image,

            }, { where: {id} }
        )
    if(!updatedMaterial){
        throw new Error ('El material que intenta actualizar aún no está registrado')
    }
    else{
        const newMaterialInfo = models.Material.findByPk(id)
        return newMaterialInfo
    }

    }
    catch (error) {
        throw new Error('Error al editar material' + error)
    }
}