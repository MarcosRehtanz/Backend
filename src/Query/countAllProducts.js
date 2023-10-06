import { models } from "../db.js";
import { filteringMaterials } from "../helper/filters.js"

export const countAllProducts = async (root, args) => {
    const { filterMaterials, filterSubMaterials } = args
    try {
        let result = null;

        if (filterMaterials) { // Si el filtro de materiales tiene un valor entonces se filtra
            result = await filteringMaterials(filterMaterials, filterSubMaterials);
            // result = result.length
        } else {
            result = await models.Product.count(); // en primera instancia se buscan todos los productos
        }

        // Retorno la longitud, sea que el arreglo se ha filtrado o son todos los productos
        return result
    } catch (error) {

    }

}