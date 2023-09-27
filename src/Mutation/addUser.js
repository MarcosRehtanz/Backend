import { models } from "../db.js"

export const addUser = async (root, args) => {
    const { name, email, password, nickName, phone, postalCode, address, profilePicture } = args
    try {
        const [user, created] = await models.User.findOrCreate({
            where: {
                userName,
                name,
                lastName,
                email,
                nickName,
                phone,
                cuitCuil, 
                postalCode, 
                address,
                profilePicture
            },
            defaults: { password }
        })
        
        return user

    } catch (error) {
        console.log(error.message);
        return args
    }
}