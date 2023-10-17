import { models } from "../db.js"
import { uploadProductImg } from "./uploadProductImg.js";

export const addMaterial = async (_, args) => {

    try {
        const { name, description, image, submaterials } = args
        if (!name || !description || !image || !submaterials) return new Error("Faltan datos")

        const mat = await models.Materials.findOne({ where: { name } })
        if (mat) throw new Error("El material ya esta creado")
        const urlImage = await uploadProductImg(image)
        const material = await models.Materials.create({
            name,
            description,
            image: urlImage
        })

        await Promise.all(submaterials.map(async (submaterial) => {
            const { name } = submaterial
            await models.SubMaterials.create({
                name,
                MaterialId: material.id
            })
        }))

        if (!material) return new Error("No se pudo crear el material")
        return material

    } catch (error) {
        throw new Error(error.message);
    }
}