import { models } from "../db.js";
import mercadopago from "mercadopago";
import "dotenv/config";
export const addShoppingHistory = async (root, args) => {

  mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN_MP,
  });
  const { payment_id, status, merchant_order_id, email } = args;
  try {
    if (!payment_id || !status || !merchant_order_id || !email)
      throw new Error("Faltan datos");
    const response = await mercadopago.payment.findById(payment_id);

    const user = await models.User.findOne({
      where: { email },
    });

    if (!user)
      throw new Error(
        "usuario no registado en la base de datos. Inicie sesion con su email para continuar"
      );

    const shoppingHistoryadded = await models.ShoppingHistory.findOrCreate({
      where: {
        operationId: response.body.collector_id,
        paymentMethod: response.body.payment_type_id,
        paymentMethodId: response.body.payment_method_id,
        netAmount: response.body.transaction_details.net_received_amount,
        taxes: response.body.taxes_amount,
        totalAmount: response.body.transaction_amount,
        UserIdUser: user.dataValues.idUser,
      },
    });

    if (!shoppingHistoryadded)
      throw new Error("Falta informacion para crear el historial");

    const res = {
      IDShopHistory: shoppingHistoryadded[0].dataValues.IDShopHistory,
      operationId: shoppingHistoryadded[0].dataValues.operationId,
      paymentMethod: shoppingHistoryadded[0].dataValues.paymentMethod,
      paymentMethodId: shoppingHistoryadded[0].dataValues.paymentMethodId,
      netAmount: shoppingHistoryadded[0].dataValues.netAmount,
      taxes: shoppingHistoryadded[0].dataValues.taxes,
      totalAmount: shoppingHistoryadded[0].dataValues.totalAmount,
      UserIdUser: shoppingHistoryadded[0].dataValues.UserIdUser,
    };
    return res;
  } catch (error) {
    throw new Error("Algo salio mal");
  }
};
