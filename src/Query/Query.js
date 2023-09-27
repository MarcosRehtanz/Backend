import { gql } from "apollo-server";
import { allUsers } from "./allUsers.js";
import { allProducts } from "./allProducts.js";
import { allCarts } from "./allCart.js";
import { allShoppingHistory } from "./allShoppingHistory.js";
import { allTypePerson } from "./allTypePerson.js";
import { allTypeUser } from "./allTypeUser.js";
import { orderingStock } from "./orderingStock.js";
import { orderingPrice } from "./orderingPrice.js";

export const QueryType = gql`
    type Query {
        allUsers: [User]
        allProducts: [Product]
        allCarts: [Cart]
        allShoppingHistory: [ShoppingHistory]
        allTypePerson: [TypePerson]
        allTypeUser: [TypeUser]
        orderingStock(
            orderStock: String!
            orderPrice: String
        ): [Product]
        orderingPrice(
            orderPrice: String!
            orderStock: String
        ): [Product]
    }
`

export const Query = {
    allUsers,
    allProducts,
    allCarts,
    allShoppingHistory,
    allTypePerson,
    allTypeUser,
    orderingStock,
    orderingPrice
}