import { gql } from "apollo-server";
import { addUser } from "./addUser.js";
import { addProduct } from "./addProduct.js";
import { uploadProductImg } from "./uploadProductImg.js";
import { addShoppingHistory } from "./addShoppingHistory.js";
// import { addTypePerson } from "./addTypePerson.js";
import { addTypeUser } from "./addTypeUser.js";
import { addMaterial } from "./addMaterial.js";
import { userRegister } from "./userRegister.js";
import { signUp } from "./singUp.js";
import { login } from "./login.js";
import { google } from "./google.js";
import { deleteProduct } from "./deleteProduct.js";
import {restoreProduct} from "./restoreProduct.js"
import {updateProfile} from "./updateProfile.js"
import {updateProduct} from "./updateProduct.js"
import {updateUser} from "./updateUser.js"
import {restoreProfile} from "./restoreProfile.js"
import {deleteProfile} from "./deleteProfile.js"
import {deleteUser} from "./deleteUser.js"
import {restoreUser} from "./restoreUser.js"
import { orderMercadoPago } from "./orderMercadoPago.js";

export const MutationType = gql`
  type Mutation {
    userRegister(
      name: String!
      lastname: String!
      email: String!
      password: String!
    ): User
    signUp(
      name: String!
      lastname: String!
      email: String!
      password: String!
    ): User
    login(
      email: String!
      password: String!
    ): User
    addUser(
      userName: String!
      name: String!
      lastname: String!
      email: String!
      password: String!
      cuitCuil: String!
      phone: String!
      address: String!
      postalCode: Int!
      acountActive: Boolean!
      termsAndCondsAprove: Boolean!
      profilePicture: String
      afipCondition: AfipCondition!
      typeUser: TypeUser!
    ): User
    addProduct(
      name: String!
      description: String!
      price: Float!
      stock: Int!
      publicationDate: String!
      productImage: String!
      id: ID!
      MaterialId: ID!
    ): Product

    orderMercadoPago(
        id: [ID!]!
        title: [String!]!
        picture_url: [String!]!
        unit_price: [Int!]!
        currency_id: [String!]!
        description: [String]!
        quantity: [Int!]!
    ): MercadoPago

    addShoppingHistory(billDate: String!, totalAmount: Float!): ShoppingHistory
    # addTypePerson(
    #     typePerson: String
    # ): TypePerson
    addTypeUser(typeUser: String): TypeUser
    addMaterial(name: String!, origen: String!, image: String!): Material
    uploadProductImg(photo: String): String
    deleteProduct(id: ID): String
    google(email:String! name:String! lastname:String!): User
    updateProfile(
        idProfile: ID
        userName: String!
        cuitCuil: String!
        phone: String!
        address:String!
        postalCode: String!
        description: String!
        typeUser: TypeUser!
        afipCondition: AfipCondition!
        profilePicture: String!
    ) : Profile
    restoreProduct(idProduct: ID!): Product
    updateProduct(
                idProduct: ID!
                name: String!
                description: String!
                price: Float!
                stock: Float!
                publicationDate: String!
                productImage:String!): Product
    updateUser(
                idUser: ID!
                name: String!
                lastname: String!
                email: String!
                password: String!
                acountActive: Boolean!
                termsAndCondsAprove: Boolean!
                ): User
    deleteProfile(idProfile: ID!): String 
    restoreProfile(idProfile: ID!): Profile
    deleteUser(idUser: ID!): String
    restoreUser(idUser: ID!): User
  }
`;

export const Mutation = {
  addUser,
  addProduct,
  addShoppingHistory,
  // addTypePerson,
  addTypeUser,
  addMaterial,
  uploadProductImg,
  userRegister,
  signUp,
  login,
  google,
  updateProfile,
  deleteProduct,
  restoreProduct,
  updateProduct,
  updateUser,
  deleteProfile,
  restoreProfile,
  deleteUser,
  restoreUser,
  orderMercadoPago,
};
