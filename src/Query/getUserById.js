import { models } from "../db.js";
import { UserInputError } from "apollo-server";
export const getUserById = async (_, args) => {
  try {
    const { id } = args;
    if (!id)
      throw new UserInputError("Debe proporcionar un ID", {
        invalidArgs: id,
      });
      const user = await models.User.findOne({ where:{idUser:id}, include: models.Product});
      if(!user) throw new Error(error.message);
      return user;
  } catch (error) {
    throw new Error(error.message)
  }
};
