import { gql } from "apollo-server";
import { addUser } from "./addUser.js";
import { addProduct } from "./addProduct.js";

export const MutationType = gql`
    type Mutation {
        addUser(
            name: String!
            email: String!
            password: String!
            nickName: String!
            phone: String
            postalCode: Int
            address: String
        ): User
        addProduct(
            name: String!
            description: String!
            price: Float
            stock: Int
            publicationDate: String
        ): Product
    }
`

export const Mutation = {
    addUser,
    addProduct
}