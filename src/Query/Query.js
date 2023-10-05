import { gql } from "apollo-server";
import { allUsers } from "./allUsers.js";
import { allProducts } from "./allProducts.js";

import { allShoppingHistory } from "./allShoppingHistory.js";
// import { allTypePerson } from "./allTypePerson.js";
import { allTypeUser } from "./allTypeUser.js";
import { getAllMaterial } from "./getAllMaterial.js";
import { allProductsByUser } from "./allProductsByUser.js"

import { filterUnion } from "./filterUnion.js";
import { searchProductByName } from "./searchProductByName.js";
import { searchUserByName } from "./searchUserByName.js";

import { getUserById } from "./getUserById.js";
import { getProductById } from "./getProductById.js";

import { feedbackMercadoPago } from "./feedbackMercadoPago.js";
export const QueryType = gql`
    type Query {
        allUsers: [User]
        allProducts: [Product]
        allShoppingHistory: [ShoppingHistory]
        # allTypePerson: [TypePerson]
        allTypeUser: [TypeUser]
        getAllMaterial: [Material!]
        allProductsByUser(id:ID!): [Product] 
        getUserById(id:ID!): User
        _: Boolean
        searchProductByName(
            nameProduct: String!
        ): [Product]
        searchUserByName(
            nameUser: String!
        ): [User]
        filterUnion(
            filterMaterials: String
            firstOrder: String
            orderPrice: String
            orderStock: String
        ): [Product]
        getProductById(
            id: ID!
        ): Product

    feedbackMercadoPago(success:SuccesInput): InfoResMP
    }
`

export const Query = {
    allUsers,
    allProducts,
    allShoppingHistory,
    // allTypePerson,
    allTypeUser,
    getAllMaterial,
    allProductsByUser,
    getUserById,
    searchProductByName,
    searchUserByName,
    filterUnion,
    getProductById,
    feedbackMercadoPago
}