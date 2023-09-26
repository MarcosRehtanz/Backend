import { Sequelize } from "sequelize";
import 'dotenv/config'
import { user } from "./Models/User.js";

const sequelize = new Sequelize( process.env.POSTGRES, {logging:false} )

//Define
user(sequelize)

//Models
const { User } = sequelize.models
console.log(User)

export const conn = sequelize
export const models = sequelize.models