import { Sequelize } from "sequelize";
import 'dotenv/config'
import { user } from "./Models/User.js";
import { product } from "./Models/Product.js";

const sequelize = new Sequelize( process.env.POSTGRES, {logging:false} )

//Define
user(sequelize)
product(sequelize)

//Models
const { User, Product } = sequelize.models
console.log(User, Product)

export const conn = sequelize
export const models = sequelize.models