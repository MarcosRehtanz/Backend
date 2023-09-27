import { models } from "../db.js"

export const addUser = async (root, args) => {
    const { name, email, password, nickName, phone, postalCode, address, profilePicture } = args
    try {
        const [user, created] = await models.User.findOrCreate({
            where: {
                userName: userName || null,
                name,
                lastName: lastName || null,
                email,
                nickName,
                phone: phone || null,
                cuitCuil, 
                postalCode: postalCode || null, 
                address: address || null,
                profilePicture: profilePicture || null
            },
            defaults: { password }
        })
        
        return user

    } catch (error) {
        console.log(error.message);
        return args
    }
}