import { Sequelize } from "sequelize";
import 'dotenv/config'

const sequelize = new Sequelize( process.env.POSTGRES, {logging:false} )


export const conn = sequelize
export const Models = sequelize.models