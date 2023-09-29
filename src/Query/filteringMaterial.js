import { Op, Sequelize } from "sequelize"
import { models } from "../db.js"


export const filteringMaterial = async (root, args) => {
    const { materials, afipCondition, typeUser } = args
    const materialsArray = materials.split(",")
    const materialObject = materialsArray.map(material => ( material.trim() ))

    try {
        if (materials){
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
        } 

        const product = await models.Product.findAll({ include: models.Material });
        return product
    

    } catch (error) {

    }

}