import { models } from "../db.js";

export const addProduct = async (root, args) => {
  try {
    const { name, description, price, stock, publicationDate, productImage, id, MaterialId} =
      args;
    if (
      !name ||
      !description ||
      !price ||
      !stock ||
      !publicationDate ||
      !productImage ||
      !id ||
      !MaterialId
    ){
      throw new Error(error.message);
    }
     
    const product = await models.Product.create({
        name,
        description,
        price,
        stock,
        publicationDate,
        productImage,
        UserIdUser: id,
        MaterialId: MaterialId
    });

    const productCreated = await models.Product.findOne({
      where: {
        idProduct: product.idProduct
      },
      include: models.Material
    })
    return productCreated;
  } catch (error) {
    throw new Error(error.message);
  }
};
