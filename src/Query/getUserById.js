import { product } from "../Models/Product.js";
import { models } from "../db.js";
import { UserInputError } from "apollo-server";
export const getUserById = async (_, args) => {
  try {
    const { id } = args;
    if (!id)
      throw new UserInputError("Debe proporcionar un ID", {
        invalidArgs: id,
      });
      const user = await models.User.findOne({ where:{idUser:id}, include: [models.Product, models.Profile]});
      if(!user) throw new Error(error.message);
      const Product = user.dataValues.Products.map(p=> p.dataValues)
      
      const objUser = {
        idUser:user.dataValues.idUser,
        name: user.dataValues.name,
        lastname:user.dataValues.lastname,
        email:user.dataValues.email,
        password:user.dataValues.password,
        acountActive:user.dataValues.acountActive,
        termsAndCondsAprove:user.dataValues.termsAndCondsAprove,
        product: [...Product],
        profile:user.dataValues.Profile.dataValues
      }
      console.log(objUser)
      return objUser;
  } catch (error) {
    throw new Error(error.message)
  }
};
