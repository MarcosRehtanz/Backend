import { models } from "../db.js"


export const allUsers = async() => {
    
    try {
        
        const users = await models.User.findAll()
        return users

    } catch (error) {
        
    }

}