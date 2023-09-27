import { Sequelize } from "sequelize";
import 'dotenv/config'

import { user } from "./Models/User.js";
import { product } from "./Models/Product.js";
import { cart } from "./Models/Cart.js";
import { shoppingHistory } from "./Models/ShoppingHistory.js";
import { typePerson } from "./Models/TypePerson.js";
import { typeUser } from "./Models/TypeUser.js";

const sequelize = new Sequelize( process.env.POSTGRES, {logging:false} )



//Define
user(sequelize)
product(sequelize)
cart(sequelize)
shoppingHistory(sequelize)
typePerson(sequelize)
typeUser(sequelize)

//Models
const { User, Product, Cart, ShoppingHistory,  TypePerson, TypeUser} = sequelize.models
// console.log(sequelize.models)


// Relations

User.hasOne(Cart);
Cart.belongsTo(User);

Product.belongsToMany(Cart, {through: 'ProductCart'})
Cart.belongsToMany(Product, {through:'ProductCart'})

User.hasMany(ShoppingHistory,{
    foreignKey: 'userID'
  })
ShoppingHistory.belongsTo(User)

// User.hasOne(TypePerson);
// TypePerson.belongsTo(User);

// User.belongsToMany(TypeUser, {through: 'UserTypeUser'})
// TypeUser.belongsToMany(User, {through:'UserTypeUser'})

export const conn = sequelize
export const models = sequelize.models