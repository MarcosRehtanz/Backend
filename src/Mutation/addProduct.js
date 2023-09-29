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
     
    const product = await models.Product.findOrCreate({
      where: {
        name,
        description,
        price,
        stock,
        publicationDate,
        productImage,
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
