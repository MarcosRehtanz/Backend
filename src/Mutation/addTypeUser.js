import { models } from "../db.js"

export const addTypeUser = async (root, args) => {
    const { typeUser } = args

    try {
        const [typeUserTable, created] = await models.TypeUser.findOrCreate({
            where: {
                typeUser
            },
        })
        
        return typeUserTable

    } catch (error) {
        console.log(error.message);
        return args
    }
}