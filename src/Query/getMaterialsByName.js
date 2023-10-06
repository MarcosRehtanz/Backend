import { Op } from "sequelize"
import { models } from "../db.js"

export const getMaterialsByName = async (_, args) => {
    const { stringMaterials } = args;

    try {
        const materials = stringMaterials.split(",")
        const materialsArray = materials.map(material => (material.trim()));
        const material = await models.Materials.findAll({
            where: {
                name: {
                    [Op.in]: materialsArray
                }
            },
            include: models.SubMaterials
        });
        return material;
    } catch (error) {
        console.log(error.message);
    }
};