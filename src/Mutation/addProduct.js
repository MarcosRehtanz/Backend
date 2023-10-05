import { models } from "../db.js";
import { uploadProductImg } from "./uploadProductImg.js";

export const addProduct = async (root, args) => {
  try {
    const { name, description, price, stock, publicationDate, productImage, id, Materials, SubMaterials } =
      args;
    if (
      !name ||
      !description ||
      !price ||
      !stock ||
      !publicationDate ||
      !productImage ||
      !id
    ) {
      throw new Error(error.message);
    }

    const urlImage = await uploadProductImg(productImage)
    const product = await models.Product.create({
      name,
      description,
      price,
      stock,
      publicationDate,
      productImage: urlImage,
      UserIdUser: id
    });

    await product.addMaterials(Materials);
    await product.addSubMaterials(SubMaterials);

    const productCreated = await models.Product.findByPk( product.idProduct, { include: [models.Materials, models.SubMaterials] })
    console.log(productCreated);
    return productCreated;
  } catch (error) {
    throw new Error(error.message);
  }
};
