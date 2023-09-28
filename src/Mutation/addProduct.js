import { models } from "../db.js";

export const addProduct = async (root, args) => {
  try {
    const { name, description, price, stock, publicationDate, productImage, id} =
      args;
    if (
      !name ||
      !description ||
      !price ||
      !stock ||
      !publicationDate ||
      !productImage ||
      !id
    )
      throw new Error(error.message);
     
    const product = await models.Product.findOrCreate({
      where: {
        name,
        description,
        price,
        stock,
        publicationDate,
        productImage,
        UserIdUser: id
      },
  
    });
    
    console.log(product[0].dataValues);
    return product[0].dataValues;
  } catch (error) {
    throw new Error(error.message);
  }
};
