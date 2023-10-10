import { models } from "../db.js";

export const updateProduct = async (_, args) => {

    const { idProduct,
        name,
        description,
        price,
        stock,
        publicationDate,
        productImage } = args;

    try {
        const updatedProduct = await models.Product.update(
            {
                name,
                description,
                price,
                stock,
                publicationDate,
                productImage
            }, { where: {idProduct}, include: [models.Materials, models.SubMaterials] }
        )
    if(!updatedProduct){
        throw new Error ('El producto que intenta actualizar aún no está registrado')
    }
    else{
        const newProductInfo = await models.Product.findByPk(idProduct, { include: [models.Materials, models.SubMaterials] })
        return newProductInfo
    }

    }
    catch (error) {
        throw new Error('Error al editar producto' + error)
    }
}