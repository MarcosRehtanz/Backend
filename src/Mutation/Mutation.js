import { gql } from "apollo-server";
import { addUser } from "./addUser.js";
import { addProduct } from "./addProduct.js";
import { uploadProductImg } from "./uploadProductImg.js";
import { addShoppingHistory } from "./addShoppingHistory.js";
// import { addTypePerson } from "./addTypePerson.js";
import { addTypeUser } from "./addTypeUser.js";
import { addMaterial } from "./addMaterial.js";
import { addReview } from "./addReview.js";
import { addSubMaterial } from "./addSubMaterial.js";
import { userRegister } from "./userRegister.js";
import { signUp } from "./singUp.js";
import { login } from "./login.js";
import { google } from "./google.js";
import { deleteProduct } from "./deleteProduct.js";
import { restoreProduct } from "./restoreProduct.js";
import { updateProfile } from "./updateProfile.js";
import { updateProduct } from "./updateProduct.js";
import { updateReview } from "./updateReview.js";
import { updateUser } from "./updateUser.js";
import { restoreProfile } from "./restoreProfile.js";
import { deleteProfile } from "./deleteProfile.js";
import { deleteUser } from "./deleteUser.js";
import { restoreUser } from "./restoreUser.js";
import { orderMercadoPago } from "./orderMercadoPago.js";
import { updateMaterial } from "./updateMaterial.js";
import { restoreMaterial } from "./restoreMaterial.js";
import { deleteMaterial } from "./deleteMaterial.js";
import { deleteSubMaterial } from "./deleteSubMaterial.js";
import { deleteReview } from "./deleteReview.js";
import { restoreReview } from "./restoreReview.js";
import { PasswordResetInit } from "./PasswordResetInit.js";
import { switchRole } from "./switchRole.js";
import { banProfile } from "./banProfile.js";
import { addBlog } from "./addBlog.js";
import { sendFooterEmail } from "./sendFooterEmail.js";
import { deletePostBlog } from "./deletePostBlog.js";
import { restorePostBlog } from "./restorePostBlog.js"
import { updateBlog } from "./updateBlog.js"
import { updatePassword } from "./updatePassword.js"

export const MutationType = gql`
  type Mutation {
    userRegister(
      name: String!
      lastname: String!
      email: String!
      password: String!
    ): User
    signUp(token: String!): User
    login(email: String!, password: String!): User
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
      role: Role
    ): User
    addProduct(
      name: String!
      description: String!
      price: Float!
      stock: Int!
      publicationDate: String!
      productImage: String!
      id: ID!
      Materials: [ID!]
      SubMaterials: [ID!]
    ): Product

    orderMercadoPago(product: [ProductInput], idUser: ID): MercadoPago

    addShoppingHistory(
      payment_id: Int
      status: String
      merchant_order_id: String
      idUser: String
    ): ShoppingHistory

    # addTypePerson(
    #     typePerson: String
    # ): TypePerson

    addTypeUser(typeUser: String): TypeUser
    addMaterial(
    name: String!,
     description: String!, 
     image: String!,
     submaterials: [SubMaterialInput] )
     : Materials
    uploadProductImg(photo: String): String
    deleteProduct(id: ID): String
    google(email: String!, name: String!, lastname: String!): User
    updateProfile(
      idProfile: ID
      userName: String!
      cuitCuil: String!
      phone: String!
      address: String!
      postalCode: String!
      description: String!
      typeUser: TypeUser!
      afipCondition: AfipCondition!
      profilePicture: String!
    ): Profile
    restoreProduct(idProduct: ID!): String
    updateProduct(
      idProduct: ID!
      name: String!
      description: String!
      price: Float!
      stock: Float!
      publicationDate: String!
      productImage: String!
      Materials: [ID!]
      SubMaterials: [ID!]
    ): Product
    updateUser(
      idUser: ID!
      name: String!
      lastname: String!
      email: String!
      password: String!
      acountActive: Boolean!
      role: String
      termsAndCondsAprove: Boolean!
    ): User
    deleteProfile(idProfile: ID!): String
    restoreProfile(idProfile: ID!): Profile
    deleteUser(idUser: ID!): String
    restoreUser(idUser: ID!): String
    addReview(
      title: String!
      rating: Int!
      comment: String!
      idProduct: String!
      idUser: String!
    ): Review
    updateReview(
      idReview: ID!
      title: String!
      rating: Int!
      comment: String!
    ): Review
    addSubMaterial(
      materialId: ID!
      name: String!
      description: String!
    ): SubMaterials
    updateMaterial(
      id: ID!
      name: String!
      description: String!
      image: String!
    ): Materials
    deleteMaterial(id: ID!): String
    restoreMaterial(id: ID!): Materials
    deleteSubMaterial(id: ID!): String
    deleteReview(idReview: ID!): String
    restoreReview(idReview: ID!): Review
    PasswordResetInit(email: String): String
    switchRole(idUser: ID!): Message
    banProfile(idProfile: ID!, username: String!, cuitCuil: String): Message

    addBlog(title: String!, description: String!, date: String!): String
    deletePostBlog(id: ID!): String

    sendFooterEmail(
      name: String!
      senderEmail: String!
      reason: String!
      message: String!
      phone: String!
      destinationEmail: String
    ): FormFooter
    restorePostBlog(id:ID!): Blog
    updateBlog(
        id:ID!
        title:String!
        description:String!
        date:String!
    ): Blog
    updatePassword(password: String!): User
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
  addReview,
  updateReview,
  addSubMaterial,
  // updateSubMaterials,
  deleteSubMaterial,
  // restoreSubmaterials,
  updateMaterial,
  restoreMaterial,
  deleteMaterial,
  deleteReview,
  restoreReview,
  PasswordResetInit,
  switchRole,
  banProfile,
  addBlog,
  sendFooterEmail,
  deletePostBlog,
  restorePostBlog,
  updateBlog,
  updatePassword,
};
