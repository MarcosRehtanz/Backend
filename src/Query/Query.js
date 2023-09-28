import { gql } from "apollo-server";
import { allUsers } from "./allUsers.js";
import { allProducts } from "./allProducts.js";

import { allShoppingHistory } from "./allShoppingHistory.js";
// import { allTypePerson } from "./allTypePerson.js";
import { allTypeUser } from "./allTypeUser.js";
import { getAllMaterial } from "./getAllMaterial.js";
import {allProductsByUser} from "./allProductsByUser.js"

import { filteringMaterial } from "./filteringMaterial.js";
import { filteringAfipCondition } from "./filteringAfipCondition.js";
import { orderingStock } from "./orderingStock.js";
import { orderingPrice } from "./orderingPrice.js";

import { getUserById } from "./getUserById.js";

export const QueryType = gql`
    type Query {
        allUsers: [User]
        allProducts: [Product]
        allShoppingHistory: [ShoppingHistory]
        # allTypePerson: [TypePerson]
        allTypeUser: [TypeUser]
        orderingStock(
            orderStock: String!
            orderPrice: String
        ): [Product]
        orderingPrice(
            orderPrice: String!
            orderStock: String
        ): [Product]
        getAllMaterial: [Material!]
        allProductsByUser(id:ID!): [Product] 
        getUserById(id:ID!): User
        filteringMaterial(
            idMaterial: String!
        ): [Product]
        filteringAfipCondition(
            afipCondition: String!
            typeUser: String!
        ): [Product]
    }
`

export const Query = {
    allUsers,
    allProducts,

    allShoppingHistory,
    // allTypePerson,
    allTypeUser,
    orderingStock,
    orderingPrice,
    getAllMaterial,
    allProductsByUser,
    getUserById,
    filteringMaterial,
    filteringAfipCondition
}