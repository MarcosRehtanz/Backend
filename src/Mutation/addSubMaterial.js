import { models } from "../db.js"

export const addSubMaterial = async (_, args) => {

    try {
        const { materialId, name, description } = args
        if (!materialId || !name || !description) return new Error("Faltan datos")

        const mat = await models.SubMaterials.findOne({ where: { name } })
        if (mat) throw new Error("El material ya esta creado")
        const material = await models.SubMaterials.create({
            name,
            description,
            MaterialId: materialId
        })

        if (!material) return new Error("No se pudo crear el material")
        return material

    } catch (error) {
        throw new Error(error.message);
    }
}