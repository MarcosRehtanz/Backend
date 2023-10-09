import { models } from "../db.js"

export const updateReview = async (root, args) => {
    const { idReview, title, rating, comment } = args

    try {
        const [indefinido, review] = await models.Review.update({ title, rating, comment }, { where: { idReview }, returning: true, plain: true })

        return review

    } catch (error) {
        console.log(error.message);
        return args
    }
}