import { models } from "../db.js";
import { uploadProductImg } from "./uploadProductImg.js";

export const addProduct = async (root, args) => {
  console.log(args);
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
    const urlImage = await uploadProductImg(productImage) 
    const product = await models.Product.findOrCreate({
      where: {
        name,
        description,
        price,
        stock,
        publicationDate,
        productImage: urlImage,
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
