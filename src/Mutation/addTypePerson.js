// import { models } from "../db.js"

// export const addafipCondition = async (root, args) => {
//     const { afipCondition } = args

//     try {
//         const [typePersonTable, created] = await models.TypePerson.findOrCreate({
//             where: {
//                 afipCondition
//             },
//         })
        
//         return typePersonTable

//     } catch (error) {
//         console.log(error.message);
//         return args
//     }
// }