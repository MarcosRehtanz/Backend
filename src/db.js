import { Sequelize } from "sequelize";
import 'dotenv/config'
import { User } from "./Models/User.js";

const sequelize = new Sequelize( process.env.POSTGRES, {logging:false} )

//Define
User(sequelize)

//Models
// const { User } = sequelize.models
console.log(sequelize.models)

export const conn = sequelize
export const models = sequelize.models