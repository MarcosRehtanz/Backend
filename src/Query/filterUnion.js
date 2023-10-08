import { sortingUnified, filteringMaterials } from "../helper/filters.js"

import { allProductsMaterials } from "../helper/queryModels.js";

export const filterUnion = async (root, args) => {
    const { filterMaterials, filterSubMaterials, firstOrder, orderPrice, orderStock, limit, offset } = args
    try {
        let result = null;
        
        if (filterMaterials?.length > 0 && filterMaterials) { // Si el filtro de materiales tiene un valor entonces se filtra
            const subMaterials = (filterSubMaterials?.length > 0 && filterSubMaterials) ? filterSubMaterials : null;
            result = await filteringMaterials(filterMaterials, subMaterials, limit, offset);
        } else {
            result = await allProductsMaterials(limit, offset); // en primera instancia se buscan todos los productos
        }

        if(firstOrder){
            result = sortingUnified(result, firstOrder, orderStock, orderPrice)
        }
        
        return result
    } catch (error) {

    }

}