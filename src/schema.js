import { gql } from "apollo-server";
import { QueryType } from "./Query/Query.js";
import { MutationType } from "./Mutation/Mutation.js";

export const typeDefs = gql`
  type User {
    idUser: ID!
    userName: String!
    name: String!
    lastname: String!
    email: String!
    password: String!
    cuitCuil: String!
    phone: String!
    address: String!
    postalCode: Int!
    "status o isAcountActive ? para verificar estado de la cuenta"
    acountActive: Boolean!
    termsAndCondsAprove: Boolean!
    deleteAd: String
    profilePicture: String
    description: String
    cart: [String]
    product: Product
    afipCondition: AfipCondition!
    typeUser: TypeUser!
    shoppingHistory: ShoppingHistory
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

 type ShoppingHistory {
    IDShopHistory: ID!
    billDate: String!
    totalAmount: Float!
    "user: User!"
    product: Product
  }

  enum AfipCondition {
    Fisica
    Juridica
  }
  enum TypeUser {
    comprador
    vendedor
    transportista
  }

  type Material {
    id: ID!
    name: String!
    origen: String!
  }
  ${QueryType}
  ${MutationType}
`;
