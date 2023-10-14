import { models } from "../db.js";

export const allProductsByUser = async (_, args) => {
  try {
    const { id } = args;
    if (!id)
      throw new UserInputError("Debe proporcionar un ID", {
        invalidArgs: id,
      });
      const product = await models.Product.findAll({
        where: { UserIdUser: id }, include: [models.Materials, models.SubMaterials]
      });

    return product;
  } catch (error) {
    console.log(error, "el error");
  }
};
