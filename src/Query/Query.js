import { gql } from "apollo-server";
import { allUsers } from "./allUsers.js";
// import { allProducts } from "./countAllProducts.js";
import { countAllProducts } from "./countAllProducts.js";

import { allShoppingHistory } from "./allShoppingHistory.js";
// import { allTypePerson } from "./allTypePerson.js";
import { allTypeUser } from "./allTypeUser.js";
import { getAllMaterial } from "./getAllMaterial.js";
import { allProductsByUser } from "./allProductsByUser.js";

import { filterUnion } from "./filterUnion.js";
import { searchProductByName } from "./searchProductByName.js";
import { searchUserByName } from "./searchUserByName.js";

import { getUserById } from "./getUserById.js";
import { getProductById } from "./getProductById.js";
import { getMaterialsByName } from "./getMaterialsByName.js";

import { feedbackMercadoPago } from "./feedbackMercadoPago.js";
import { allSubmaterial } from "./allSubmaterials.js";

import { getShoppingHistorybyUser } from "./getShoppingHistoryByUser.js";
export const QueryType = gql`
  type Query {
    allUsers: [User]

    allShoppingHistory: [ShoppingHistory]
    # allTypePerson: [TypePerson]
    allTypeUser: [TypeUser]
    getAllMaterial: [Materials!]
    allProductsByUser(id: ID!): [Product]
    getUserById(id: ID!): User
    _: Boolean
    searchProductByName(nameProduct: String!): [Product]
    searchUserByName(nameUser: String!): [User]

    filterUnion(
      filterMaterials: [String]
      filterSubMaterials: [String]
      firstOrder: String
      orderPrice: String
      orderStock: String
      limit: Int
      offset: Int
    ): [Product]

    countAllProducts(
      filterMaterials: [String]
      filterSubMaterials: [String]
    ): Int

    getProductById(id: ID!): Product
    allSubmaterial: [SubMaterials]
    getMaterialsByName(stringMaterials: String!): [Materials]
    feedbackMercadoPago(success: SuccesInput): InfoResMP
    getShoppingHistorybyUser(userId: ID!): [ShoppingHistory]
  }
`;

export const Query = {
  allUsers,
  // allProducts,
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
  feedbackMercadoPago,
  allSubmaterial,
  getMaterialsByName,
  countAllProducts,
  getShoppingHistorybyUser,
};
