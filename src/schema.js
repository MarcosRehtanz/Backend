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
        profilePicture: String
    }

    type Product {
        idProduct: ID!
        name: String!
        description: String!
        price: Float
        stock: Int
        publicationDate: String
        productImage: String!
    }
    type Cart {
        idCart: ID!
        quantity: Int
    }
    type ShoppingHistory {
        IDShopHistory: ID!
        billDate:String!
        totalAmount: Float!
    }
    type TypePerson {
        idPerson:ID!
        typePerson:String
    }
    type TypeUser {
        idPerson: ID!
        typeUser: String
    }
 

    ${QueryType}
    ${MutationType}
`