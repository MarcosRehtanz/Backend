import { gql } from "apollo-server";
import { allUsers } from "./allUsers.js";
import { allProducts } from "./allProducts.js";

export const QueryType = gql`
    type Query {
        allUsers: [User]
        allProducts: [Product]
    }
`

export const Query = {
    allUsers,
    allProducts
}