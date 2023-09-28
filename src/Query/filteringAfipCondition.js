import { models } from "../db.js"


export const filteringAfipCondition = async (root, args) => {
    const { afipCondition, typeUser, idMaterial } = args

    try {
        const products = await models.Product.findAll()
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

        if (idMaterial) {
            const productFiltered = product.filter((prod) => prod.MaterialId === idMaterial )
            return productFiltered
        } else {
            return product
        }

    } catch (error) {

    }

}