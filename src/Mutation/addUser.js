import { models } from "../db.js"

export const addUser = async (root, args) => {
    const { name, email, password, nickName, phone, postalCode, address } = args
    try {
        const [user, created] = await models.User.findOrCreate({
            where: {
                name,
                email,
                nickName,
                phone, 
                postalCode, 
                address
            },
            defaults: { password }
        })
        
        return user

    } catch (error) {
        console.log(error.message);
        return args
    }
}