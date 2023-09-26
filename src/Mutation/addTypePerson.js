import { models } from "../db.js"

export const addTypePerson = async (root, args) => {
    const { typePerson } = args

    try {
        const [typePersonTable, created] = await models.TypePerson.findOrCreate({
            where: {
                typePerson
            },
        })
        
        return typePersonTable

    } catch (error) {
        console.log(error.message);
        return args
    }
}