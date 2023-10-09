import { models } from "../db.js";
import { filteringMaterials } from "../helper/filters.js"
import { allProductsMaterials } from "../helper/queryModels.js";

export const countAllProducts = async (root, args) => {
    const { filterMaterials, filterSubMaterials } = args
    try {
        let result = null;

        if (filterMaterials?.length > 0 && filterMaterials) { // Si el filtro de materiales tiene un valor entonces se filtra
            result = await filteringMaterials(filterMaterials, filterSubMaterials);
            // result = result.length
        } else {
            result = await models.Product.count(); // en primera instancia se buscan todos los productos
        }

        // Retorno la longitud, sea que el arreglo se ha filtrado o son todos los productos
        console.log(result);
        return result
    } catch (error) {

    }

}