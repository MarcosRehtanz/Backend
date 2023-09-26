import { models } from "../db.js"

export const addUser = async (root, args) => {
    const { name, email, password } = args
    try {
        const [user, created] = await models.User.findOrCreate({
            where: {
                name,
                email
            },
            defaults: { password }
        })
        
        return user

    } catch (error) {
        console.log(error.message);
        return args
    }
}