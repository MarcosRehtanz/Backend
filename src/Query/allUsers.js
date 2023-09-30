import { models } from "../db.js"


export const allUsers = async() => {
    
    try {
        
        const users = await models.User.findAll()
        if(!users) throw new Error (error.message)
  
        return users

    } catch (error) {
        throw new Error (error.message)
    }

}