import { models } from "../db.js";

export const getShoppingHistorybyUser = async (_, args) => {
  const { userId } = args;

  try {
    if (!userId) throw new Error("Ingrese el Id del usuario");

    const userShoppingHistory = await models.ShoppingHistory.findAll({
      where: { UserIdUser: userId },
      include: [models.BuyOrders]
    });

    if (!userShoppingHistory)
      throw new Error("El usuario no realizó ninguna compra");
    
    const res = {
      IDShopHistory: userShoppingHistory[0].dataValues.IDShopHistory,
      operationId: userShoppingHistory[0].dataValues.operationId,
      paymentMethod: userShoppingHistory[0].dataValues.paymentMethod,
      paymentMethodId: userShoppingHistory[0].dataValues.paymentMethodId,
      netAmount: userShoppingHistory[0].dataValues.netAmount,
      taxes: userShoppingHistory[0].dataValues.taxes,
      totalAmount: userShoppingHistory[0].dataValues.totalAmount,
      UserIdUser: userShoppingHistory[0].dataValues.UserIdUser,
      buyOrders:[ userShoppingHistory[0].dataValues.BuyOrders[0].dataValues]
    }
      console.log(res)
    return [res];
  } catch (error) {
    console.log(error.message)
  }
};
