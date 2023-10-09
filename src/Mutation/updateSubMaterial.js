import { models } from "../db";

export const updateSubmaterial = async (_, args) => {
    const {
        id,
        name,
        description
    } = args

    try{
        const updatedSubmaterial = await models.Submaterials.update(
            {
                name,
                description
            }, {where: {id}}
        )
        if(!updatedSubmaterial){
            throw new Error ('El submaterial que intenta actualizar aún no está registrado')
        }
        else{
            const newSubmaterialInfo = models.Submaterials.findByPk(id)
            return newSubmaterialInfo
        }
    }
    catch(error){
        throw new Error('Error al editar submaterial' + error)
    }
}