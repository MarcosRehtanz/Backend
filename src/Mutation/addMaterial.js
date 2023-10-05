import { models } from "../db.js"

export const addMaterial = async (_, args) => {

    try {
        const { name, description, image } = args
        if (!name || !description || !image) return new Error("Faltan datos")

        const mat = await models.Materials.findOne({ where: { name } })
        if (mat) throw new Error("El material ya esta creado")
        const material = await models.Materials.create({
            name,
            description,
            image
        })

        if (!material) return new Error("No se pudo crear el material")
        return material

    } catch (error) {
        throw new Error(error.message);
    }
}