import { models } from "../db.js"


export const filteringAfipCondition = async (root, args) => {
    const { afipCondition, typeUser } = args

    try {

        const sellers = await models.User.findAll({
            where: {
                afipCondition, typeUser
            }
        });
        const productWithSellers = sellers.map(async (sell) => {
            const productUser = await models.Product.findOne({
                where: {
                    UserIdUser: sell.idUser
                }
            })
            if(!productUser) return;
            return productUser;
        })

        const product = await Promise.all([...productWithSellers]);
        return product
    } catch (error) {

    }

}