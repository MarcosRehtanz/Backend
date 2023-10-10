import { models } from "../db.js";

export const updateMaterial = async (_, args) => {

    const { id,
        name,
        description,
        image,
        } = args;

    try {
        const updatedMaterial = await models.Materials.update(
            {
                name,
                description,
                image
            }, { where: {id} }
        )
    if(!updatedMaterial){
        throw new Error ('El material que intenta actualizar aún no está registrado')
    }
    else{
        const newMaterialInfo = await models.Materials.findByPk(id)
        return newMaterialInfo
    }

    }
    catch (error) {
        throw new Error('Error al editar material' + error)
    }
}