import { models } from "../db.js";
import { uploadProductImg } from "./uploadProductImg.js";

export const updateProduct = async (_, args) => {

    const { idProduct,
        name,
        description,
        price,
        stock,
        publicationDate,
        productImage,
        Materials,
        SubMaterials } = args;

    try {
        const urlImage = await uploadProductImg(productImage)
        const [indefinido, updatedProduct] = await models.Product.update({
                name,
                description,
                price,
                stock,
                publicationDate,
                productImage: urlImage
        }, { where: { idProduct }, returning: true, plain: true })
        
        await updatedProduct.setMaterials(Materials)
        await updatedProduct.setSubMaterials(SubMaterials)

        if (!updatedProduct) {
            throw new Error('El producto que intenta actualizar aún no está registrado')
        }
        else {
            const newProductInfo = await models.Product.findByPk(idProduct, { include: [models.Materials, models.SubMaterials] })
            return newProductInfo
        }
    }
    catch (error) {
        throw new Error('Error al editar producto' + error)
    }
}