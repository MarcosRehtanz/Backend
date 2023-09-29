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
    )
    throw new Error(error.message);
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
      },
    });

    const material = await models.Material.findOne({ where: { id: MaterialId } })
    
    const obj = {
      ...product[0].dataValues,
      material
    }

    return obj;
  } catch (error) {
    throw new Error(error.message);
  }
};
