import { models } from "../db.js"


export const filteringMaterial = async (root, args) => {
    const { idMaterial, afipCondition, typeUser } = args

    try {
        const products = await models.Product.findAll({ where: {
            MaterialId: idMaterial
        } });
        if (afipCondition && typeUser){
            const sellers = await models.User.findAll({
                where: {
                    afipCondition, typeUser
                }
            });
            const productWithSellers = sellers.map((seller) => {
                const productUser = products.filter(product => product.UserIdUser === seller.idUser)
                if (!productUser) return;
                return productUser;
            })
            const product = await Promise.all(productWithSellers.flat());
            return product
        }else{
            
            return products
        }

    } catch (error) {

    }

}