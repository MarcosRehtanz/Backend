import { sortingUnified, filteringMaterials } from "../helper/filters.js"

import { allProductsMaterials } from "../helper/queryModels.js";

export const filterUnion = async (root, args) => {
    const { filterMaterials, firstOrder, orderPrice, orderStock } = args
    
    try {
        let result = null;

        if (filterMaterials) { // Si el filtro de materiales tiene un valor entonces se filtra
            const materials = filterMaterials.split(",")
            const materialsArray = materials.map(material => (material.trim()))
            result = await filteringMaterials(materialsArray);
        } else {
            result = await allProductsMaterials(); // en primera instancia se buscan todos los productos
        }
        if(firstOrder){
            result = sortingUnified(result, firstOrder, orderStock, orderPrice)
        }
        
        return result
    } catch (error) {

    }

}