import { Sequelize } from "sequelize";
import 'dotenv/config'

import { user } from "./Models/User.js";
import { product } from "./Models/Product.js";
import { shoppingHistory } from "./Models/ShoppingHistory.js";
import { typePerson } from "./Models/TypePerson.js";
import { typeUser } from "./Models/TypeUser.js";
import { material } from "./Models/Material.js";
const sequelize = new Sequelize( process.env.POSTGRES, {logging:false} )



//Define
user(sequelize)
product(sequelize)
shoppingHistory(sequelize)
typePerson(sequelize)
typeUser(sequelize)
material(sequelize)
//Models
const { User, Product, ShoppingHistory,  TypePerson, TypeUser, Material} = sequelize.models
// console.log(sequelize.models)


// const conection = () =>{
  
// }


// console.log (conection())
// Relations


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
