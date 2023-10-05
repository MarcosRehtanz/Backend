import { gql } from "apollo-server";
import { QueryType } from "./Query/Query.js";
import { MutationType } from "./Mutation/Mutation.js";
export const typeDefs = gql`
  # type JwtToken {
  #   token: String!
  # }

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
    product: [Product]
    token: String!
    profile: Profile
    shoppingHistory: [ShoppingHistory]
    review: [Review]
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
    Reviews: [Review]
    averageRating: Int
    currency_id: String
    quantity: Int
  }
  input MaterialInput {
    id: ID!
    name: String!
    origin: String!
    image: String!
  }
  input ProductInput {
    idProduct: ID!
    name: String!
    description: String!
    price: Float
    stock: Int
    publicationDate: String
    productImage: String!
    Material: MaterialInput
    UserIdUser: String!
    currencyId: String
    quantity: Int
  }
  type MercadoPago {
    products: [Product]!
    # id: ID!
    # title: String!
    # picture_url: String!
    # unit_price: Int!
    currency_id: [String]! #Tipo de moneda
    # description: String
    # quantity: Int!
    response: String
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

  type Review {
    idReview: ID!
    title: String!
    rating: Int!
    comment: String!
    createdAt: String!
  }
  input SuccesInput {
    payment_id: Int
    status: String
    merchant_order_id: String
  }
  type InfoResMP {
    payment: Int!
    status: String!
    merchant_order_id: String!
  }
  ${QueryType}
  ${MutationType}
`;
