import { gql } from "apollo-server";
import { addUser } from "./addUser.js";
import { addProduct } from "./addProduct.js";
import { addCart } from "./addCart.js";
import { addShoppingHistory } from "./addShoppingHistory.js";
import { addTypePerson } from "./addTypePerson.js";
import { addTypeUser } from "./addTypeUser.js";

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
        addCart(
            quantity: Int!
        ): Cart
        addShoppingHistory(
            billDate: String
            totalAmount: Float
        ): ShoppingHistory
        addTypePerson(
            typePerson: String
        ): TypePerson
        addTypeUser(
            typeUser: String
        ): TypeUser
    }
`

export const Mutation = {
    addUser,
    addProduct,
    addCart,
    addShoppingHistory,
    addTypePerson,
    addTypeUser
}