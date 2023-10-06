import { Op } from "sequelize"
import { models } from "../db.js"

export function sortingUnified(result, firstOrder, orderStock, orderPrice) {
    if (firstOrder === "orderPrice") { // pregunto el ordenamiento que se hace primero
        if (orderStock) { // entonces pregunto si orderStock ya existe porque, el ultimo ordenamiento será el principal
            if (orderStock === "ASC_STOCK") {
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
                        return (orderStock === "ASC_STOCK") ? a.stock - b.stock : b.stock - a.stock;
                    }
                    return 0;
                });
            } else {
                result.sort((a, b) => {
                    if (a.price < b.price) return 1
                    if (b.price < a.price) return -1
                    if (a.price === b.price) {
                        return (orderStock === "ASC_STOCK") ? a.stock - b.stock : b.stock - a.stock;
                    }
                    return 0;
                });
            }
        } else {
            if (orderStock === "ASC_STOCK") {
                result.sort((a, b) => a.stock - b.stock)
            } else {
                result.sort((a, b) => b.stock - a.stock)
            }
        }
    }

    return result;
}

export async function filteringMaterials(materialsArray, subMaterialsArray, limit, offset) {
    let result = null;
    if (limit) {
        if ((!subMaterialsArray || subMaterialsArray === '') ) {
            result = await models.Product.findAll({
                include: [{
                    model: models.Materials,
                    where: {
                        name: {
                            [Op.in]: materialsArray
                        }
                    },
                },
                {
                    model: models.SubMaterials
                }],
                limit,
                offset
            })
        } else {
            result = await models.Product.findAll({
                include: [{
                    model: models.Materials,
                    where: {
                        name: {
                            [Op.in]: materialsArray
                        }
                    },
                },
                {
                    model: models.SubMaterials,
                    where: {
                        name: {
                            [Op.in]: subMaterialsArray
                        }
                    },
                }],
                limit,
                offset
            })
        }
    }else {
        if ((!subMaterialsArray || subMaterialsArray === '')) {
            result = await models.Product.count({
                include: [{
                    model: models.Materials,
                    where: {
                        name: {
                            [Op.in]: materialsArray
                        }
                    },
                },
                {
                    model: models.SubMaterials
                }]
            })
        } else {
            result = await models.Product.count({
                include: [{
                    model: models.Materials,
                    where: {
                        name: {
                            [Op.in]: materialsArray
                        }
                    },
                },
                {
                    model: models.SubMaterials,
                    where: {
                        name: {
                            [Op.in]: subMaterialsArray
                        }
                    },
                }],
            })
        }
    }
    return result;
}