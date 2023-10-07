import { models } from "../db.js";

export const getShoppingHistorybyUser = async (_, args) => {
  const { userId } = args;

  try {
    if (!userId) throw new Error("Ingrese el Id del usuario");

    const userShoppingHistory = await models.ShoppingHistory.findAll({
      where: { UserIdUser: userId },
    });

    if (!userShoppingHistory)
      throw new Error("El usuario no realizó ninguna compra");
   
      console.log(userShoppingHistory)
    return userShoppingHistory;
  } catch (error) {
    console.log(error.message)
  }
};
