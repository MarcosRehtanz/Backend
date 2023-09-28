import { gql } from "apollo-server";
import { addUser } from "./addUser.js";
import { addProduct } from "./addProduct.js";

import { addShoppingHistory } from "./addShoppingHistory.js";
// import { addTypePerson } from "./addTypePerson.js";
import { addTypeUser } from "./addTypeUser.js";
import { addMaterial } from "./addMaterial.js";
export const MutationType = gql`
    type Mutation {
        addUser(
            userName: String!
            name: String!
            lastname: String!
            email: String!
            password: String!
            cuitCuil: String!
            phone: String!
            address: String!
            postalCode: Int!
            acountActive:Boolean!
            termsAndCondsAprove: Boolean!
            profilePicture: String
            afipCondition: AfipCondition!
            typeUser:TypeUser!
        ): User
        addProduct(
            name: String!
            description: String!
            price: Float!
            stock: Int!
            publicationDate: String!
            productImage: String!
            id: ID!
        ): Product

        addShoppingHistory(
            billDate: String!
            totalAmount: Float!
        ): ShoppingHistory
        # addTypePerson(
        #     typePerson: String
        # ): TypePerson
        addTypeUser(
            typeUser: String
        ): TypeUser
        addMaterial(name: String! origen:String!): Material 
        
        deleteProduct(id: ID): String
    }
`


export const Mutation = {
    addUser,
    addProduct,
    addShoppingHistory,
    // addTypePerson,
    addTypeUser,
    addMaterial,
}