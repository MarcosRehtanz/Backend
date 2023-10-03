import { models } from "../db.js";
import { UserInputError } from "apollo-server";
export const getUserById = async (_, args) => {
  try {
    const { id } = args;
    if (!id)
      throw new UserInputError("Debe proporcionar un ID", {
        invalidArgs: id,
      });
    const user = await models.User.findOne({
      where: { idUser: id }, include: [{
        model: models.Product,
        include: models.Material
      },
      {
        model: models.Profile
      },
      {
        model: models.ShoppingHistory
      },
      {
        model: models.Review
      }
    ]
    });
    if (!user) throw new Error("mensaje que no devuelve usuario");
    const Product = user.dataValues.Products.map(p => p.dataValues)

    const objUser = {
      idUser: user.dataValues.idUser,
      name: user.dataValues.name,
      lastname: user.dataValues.lastname,
      email: user.dataValues.email,
      password: user.dataValues.password,
      acountActive: user.dataValues.acountActive,
      termsAndCondsAprove: user.dataValues.termsAndCondsAprove,
      product: [...Product],
      profile: user.dataValues.Profile.dataValues,
      shoppingHistory: user.dataValues.ShoppingHistory?.dataValues,
      review: user.dataValues.Reviews
    }

    return objUser;
  } catch (error) {
    throw new Error(error.message)
  }
};
