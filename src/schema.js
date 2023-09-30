import { gql } from "apollo-server";
import { QueryType } from "./Query/Query.js";
import { MutationType } from "./Mutation/Mutation.js";
export const typeDefs = gql`
  type JwtToken {
    token: String!
  }

  type User {
    idUser: ID!
    name: String!
    lastname: String!
    email: String!
    password: String
    "status o isAcountActive ? para verificar estado de la cuenta"
    acountActive: Boolean
    termsAndCondsAprove: Boolean
    deleteAd: String
    cart: [String]
    product: Product
    userJwtToken: JwtToken
    profile: Profile
    shoppingHistory: ShoppingHistory
  }
  type Profile {
    idProfile: ID!
    userName: String
    cuitCuil: String
    phone: String
    address: String
    postalCode: String
    description: String
    afipCondition: AfipCondition
    typeUser: TypeUser
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
    Material: Material
    UserIdUser: String!
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
    origin: String!
    image: String!
  }
  ${QueryType}
  ${MutationType}
`;
