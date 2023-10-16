import { models } from "../db.js";
import jwt from 'jsonwebtoken';
import 'dotenv/config.js'

export const verifyTokenPassReset = async (_, {token}) =>{
    console.log(token, 'Soy el token y sí entré a la mutation')
    try{
        const tokenRecieved = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
        const user = await models.User.findOne({where: {email: tokenRecieved.email}})
        if(!user){
            console.log('escribe bien ese correo')
            throw new Error ('Este usuario no existe')
        }
        else{
            console.log('Pasé por el if y el usuario sí existe')
            return user
        }

    }
    catch(error){
        throw new Error('Error 500 - Invalid Token ' + error.message)
    }
}