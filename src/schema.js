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
    role: Role
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
    isBan: Boolean
  }
  type Product {
    idProduct: ID!
    name: String!
    description: String!
    price: Float
    stock: Int
    publicationDate: String
    productImage: String!
    Materials: [Materials]
    SubMaterials: [SubMaterials]
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
    init_point: String
  }
  
  type BuyOrder {
    id: ID!
    title: String!
    quantity: Int!
    unit_price: Float!
    id_product: String!
  }

  type ShoppingHistory {
    IDShopHistory: ID!
    operationId: Int
    paymentMethod: String
    paymentMethodId: String
    netAmount: Float
    taxes: Float
    status: String
    totalAmount: Float!
    UserIdUser: ID
    buyOrders: [BuyOrder]
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
  enum Role {
    admin
    user
  }

  type Materials {
    id: ID!
    name: String!
    description: String!
    image: String!
    SubMaterials: [SubMaterials]
  }

  type SubMaterials {
    id: ID!
    name: String!
    description: String!
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
