import { models } from "../db.js"

export const getMaterialById = async (_, args) => {
    const { idMaterial } = args;

    try {
        const material = await models.Materials.findOne({
            where: {
                id: idMaterial
            },
            include: models.SubMaterials
        });
        return material;
    } catch (error) {
        console.log(error.message);
    }
};