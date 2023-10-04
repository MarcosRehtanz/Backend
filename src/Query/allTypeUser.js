import { models } from "../db.js"


export const allTypeUser = async() => {
    
    try {
        const typeUser = await models.TypeUser.findAll()
        return typeUser
    } catch (error) {
        
    }

}