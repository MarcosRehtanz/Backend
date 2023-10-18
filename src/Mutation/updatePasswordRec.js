import { models } from "../db.js";
import bcrypt from 'bcryptjs'

export const updatePasswordRec = async (_, {password, idUser}) =>{
    try{
        const pass = await bcrypt.hash(password, 8)
        const changedPasword = await models.User.update(
            {
                password: pass
            }, { where: {idUser} }
        )
        if(!changedPasword){
            throw new  Error ('Esta cuenta no existe, por favor regístrate')
        }
        else{
            const newPassword = await models.User.findByPk(idUser)
            return newPassword
        }
    }
    catch(error){
        throw new Error ('Error 500 - Internal server error: ' + error.message)
    }
}