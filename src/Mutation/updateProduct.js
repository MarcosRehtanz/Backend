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
            }, { where: {idProduct} }
        )
    if(!updatedProduct){
        throw new Error ('El producto que intenta actualizar aún no está registrado')
    }
    else{
        const newProductInfo = models.Product.findByPk(idProduct)
        return newProductInfo
    }

    }
    catch (error) {
        throw new Error('Error al editar producto' + error)
    }
}