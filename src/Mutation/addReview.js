import { models } from "../db.js"

export const addReview = async (root, args) => {
    const { title, rating, comment, idProduct, idUser } = args

    try {
        const review = await models.Review.create({ title, rating, comment, ProductIdProduct: idProduct, UserIdUser: idUser  })
        return review

    } catch (error) {
        console.log(error.message);
        return args
    }
}