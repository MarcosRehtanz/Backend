import { gql } from "apollo-server";
import { addUser } from "./addUser.js";
import { addProduct } from "./addProduct.js";
import { uploadProductImg } from "./uploadProductImg.js";
import { addShoppingHistory } from "./addShoppingHistory.js";
// import { addTypePerson } from "./addTypePerson.js";
import { addTypeUser } from "./addTypeUser.js";
import { addMaterial } from "./addMaterial.js";
import { signUp } from "./singUp.js";
import { login } from "./login.js";
import { google } from "./google.js";
import { deleteProduct } from "./deleteProduct.js";
import {restoreProduct} from "./restoreProduct.js"
import {updateProfile} from "./updateProfile.js"

export const MutationType = gql`
  type Mutation {
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
  signUp,
  login,
  google,
  updateProfile,
  deleteProduct,
  restoreProduct
};
