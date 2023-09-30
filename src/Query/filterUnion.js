import { Op } from "sequelize"
import { models } from "../db.js"


export const filterUnion = async (root, args) => {
    const { filterMaterials, firstOrder, orderPrice, orderStock } = args
    
    try {
        let result = null;

        if (filterMaterials) { // Si el filtro de materiales tiene un valor entonces se filtra
            const materialsArray = filterMaterials.split(",")
            const materialObject = materialsArray.map(material => (material.trim()))
            result = await models.Product.findAll({
                include: [{
                    model: models.Material,
                    where: {
                        name: {
                            [Op.in]: materialObject
                        }
                    },
                }]
            })
        } else {
            result = await models.Product.findAll({ include: models.Material }); // en primera instancia se buscan todos los productos
        }
        if(firstOrder){
            if (firstOrder === "orderPrice") { // pregunto el ordenamiento que se hace primero
                if (orderStock) { // entonces pregunto si orderStock ya existe porque, el ultimo ordenamiento será el principal
                    if (orderStock === "ASC") {
                        result.sort((a, b) => {
                            if (a.stock < b.stock) return -1
                            if (b.stock < a.stock) return 1
                            if (a.stock === b.stock) {
                                return (orderPrice === "ASC") ? a.price - b.price : b.price - a.price;
                            }
                            return 0;
                        });
                    } else {
                        result.sort((a, b) => {
                            if (a.stock < b.stock) return 1
                            if (b.stock < a.stock) return -1
                            if (a.stock === b.stock) {
                                return (orderPrice === "ASC") ? a.price - b.price : b.price - a.price;
                            }
                            return 0;
                        });
                    }
                } else {
                    if (orderPrice === "ASC") {
                        result.sort((a, b) => a.price - b.price)
                    } else {
                        result.sort((a, b) => b.price - a.price)
                    }
                }
            } else {
                if (orderPrice) {
                    if (orderPrice === "ASC") {
                        result.sort((a, b) => {
                            if (a.price < b.price) return -1
                            if (b.price < a.price) return 1
                            if (a.price === b.price) {
                                return (orderStock === "ASC") ? a.stock - b.stock : b.stock - a.stock;
                            }
                            return 0;
                        });
                    } else {
                        result.sort((a, b) => {
                            if (a.price < b.price) return 1
                            if (b.price < a.price) return -1
                            if (a.price === b.price) {
                                return (orderStock === "ASC") ? a.stock - b.stock : b.stock - a.stock;
                            }
                            return 0;
                        });
                    }
                } else {
                    if (orderStock === "ASC") {
                        result.sort((a, b) => a.stock - b.stock)
                    } else {
                        result.sort((a, b) => b.stock - a.stock)
                    }
                }
            }
        }
        
        return result


    } catch (error) {

    }

}