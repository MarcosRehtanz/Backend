import { Op, Sequelize } from "sequelize"
import { models } from "../db.js"


export const filteringMaterial = async (root, args) => {
    const { materials, afipCondition, typeUser } = args
    const materialsArray = materials.split(",")
    const materialObject = materialsArray.map(material => ( material.trim() ))
    console.log(materialsArray)

    try {
        const materialProduct = await models.Product.findAll({
            include: [{
                model: models.Material,
                where: {
                    name: {
                        [Op.in]: materialObject
                    }
                },
            }]
        })

        return materialProduct

    } catch (error) {

    }

}