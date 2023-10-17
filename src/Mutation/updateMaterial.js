import { models } from "../db.js";
import { uploadProductImg } from "./uploadProductImg.js";

export const updateMaterial = async (_, args) => {

    const { id,
        name,
        description,
        image,
        submaterials,
        submaterialsDestroyed
    } = args;

    try {
        const urlImage = await uploadProductImg(image)
        const updatedMaterial = await models.Materials.update(
            {
                name,
                description,
                image: urlImage
            }, { where: { id } }
        )

        if (!updatedMaterial) {
            throw new Error('El material que intenta actualizar aún no está registrado')
        }

        await Promise.all(submaterials.map(async (submaterial) => {
            const { name } = submaterial
            const findSubMaterial = await models.SubMaterials.findOne({ where: { name } });
            // En caso de encontrar el nombre del submaterial dentro de la BD
            if(findSubMaterial) {
                // en caso de encontrarse en el arreglo de submateriales borrados, entonces lo elimina
                if (submaterialsDestroyed.find(sub => findSubMaterial.name === sub.name)) {
                    await models.SubMaterials.destroy({
                        where: {
                            name
                        }
                    })
                } else {
                    // si solo lo encontró y no esta siendo eliminado, lo dejará igual
                    return;
                }
            }

            // Si no lo encuentra y se esta agregando al arreglo entonces lo crea en la BD
            else {
                await models.SubMaterials.create({
                    name,
                    MaterialId: id
                })

            }
    }))
        
        const newMaterialInfo = await models.Materials.findByPk(id)
        return newMaterialInfo
        

    }
    catch (error) {
        throw new Error('Error al editar material' + error)
    }
}