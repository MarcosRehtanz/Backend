import { gql } from "apollo-server";
import { QueryType } from "./Query/Query.js";
import { MutationType } from "./Mutation/Mutation.js";


export const typeDefs = gql`
    type User {
        idUser: ID!
        name: String!
        email: String!
        password: String!
        phone: String
        postalCode: Int
        nickName: String!
        address: String
        status: Boolean!
    }

    type Product {
        idProduct: ID!
        name: String!
        description: String!
        price: Float
        stock: Int
        publicationDate: String
    }

    ${QueryType}
    ${MutationType}
`