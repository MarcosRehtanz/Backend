import { allProductsMaterials } from "../helper/queryModels.js";

export const allProducts = async(_, args) => {
    
    try {
        const product = await allProductsMaterials();
        if(!product) throw new Error (error.message)
        // console.log(product);
        return product
    } catch (error) {
        throw new Error (error.message)
    }

}