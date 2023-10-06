import { Query } from "./Query/Query.js"
import { Mutation } from "./Mutation/Mutation.js"

export const resolvers = {
    Query,
    Product: {
        averageRating: (root) => {
            const totalReview = root.Reviews.length
            const totalRating = root.Reviews.reduce((acc, obj) => acc + obj.rating, 0);
            return root.Reviews.length === 0 ? 0 : Math.floor(totalRating / totalReview)
        }
    },
    Mutation,
}
