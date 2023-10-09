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
    
    const res = userShoppingHistory.map(uSH => ({
      IDShopHistory: uSH.dataValues.IDShopHistory,
      operationId: uSH.dataValues.operationId,
      paymentMethod: uSH.dataValues.paymentMethod,
      paymentMethodId: uSH.dataValues.paymentMethodId,
      netAmount: uSH.dataValues.netAmount,
      taxes: uSH.dataValues.taxes,
      totalAmount: uSH.dataValues.totalAmount,
      UserIdUser: uSH.dataValues.UserIdUser,
      buyOrders: uSH.dataValues.BuyOrders.map(bo => {
        console.log(bo);
        return bo.dataValues
      })
    }))
      console.log(res)
    return res;
  } catch (error) {
    console.log(error.message)
  }
};
