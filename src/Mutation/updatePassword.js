import { models } from "../db.js";
import bcrypt from 'bcryptjs'

export const updatePassword = async (_, {password}) =>{
    try{
        const pass = await bcrypt.hash(password, 8)
        const changedPasword = await models.User.update(
            {
                password: pass
            }, { where: {email} }
        )
        if(!changedPasword){
            throw new  Error ('Esta cuenta no existe, por favor regístrate')
        }
        else{
            const newPassword = await models.User.findOne(email)
            return newPassword
        }
    }
    catch(error){
        throw new Error ('Error 500 - Internal server error: ' + error.message)
    }
}