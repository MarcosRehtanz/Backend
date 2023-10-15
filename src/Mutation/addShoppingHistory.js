import { models } from "../db.js";
import mercadopago from "mercadopago";
import "dotenv/config";
export const addShoppingHistory = async (root, args) => {

  // mercadopago.configure({
  //   access_token: process.env.ACCESS_TOKEN_MP,
  // });
  const { payment_id, status, merchant_order_id, idUser } = args;
  try {
    if (!payment_id || !status || !merchant_order_id || !idUser)
      throw new Error("Faltan datos");
    const response = await mercadopago.payment.findById(payment_id);

    const user = await models.User.findOne({
      where: { idUser },
    });
    // console.log(user.dataValues);
    console.log({
      operationId: response.body.id,
      paymentMethod: response.body.payment_type_id,
      paymentMethodId: response.body.payment_method_id,
      netAmount: response.body.transaction_details.net_received_amount,
      taxes: response.body.taxes_amount,
      totalAmount: response.body.transaction_amount,
    });
    // console.log(response.body);

    if (!user.dataValues)
      throw new Error(
        "usuario no registado en la base de datos. Inicie sesion con su email para continuar"
      );

    // console.log(response.response)
    // console.log(response.response.charges_details)
    // console.log(response.response.additional_info.items)
    const [shoppingHistoryadded, created] = await models.ShoppingHistory.findOrCreate({
      where: {
        operationId: response.body.id,
        paymentMethod: response.body.payment_type_id,
        paymentMethodId: response.body.payment_method_id,
        netAmount: response.body.transaction_details.net_received_amount,
        taxes: response.body.taxes_amount,
        totalAmount: response.body.transaction_amount,
      },
      defaults: {
        UserIdUser: user.dataValues.idUser,
        status: response.body.status
      }
    });

    console.log(created);
    console.log('line 53', {
      IDShopHistory: shoppingHistoryadded.dataValues.IDShopHistory,
      operationId: shoppingHistoryadded.dataValues.operationId,
      paymentMethod: shoppingHistoryadded.dataValues.paymentMethod,
      paymentMethodId: shoppingHistoryadded.dataValues.paymentMethodId,
      netAmount: shoppingHistoryadded.dataValues.netAmount,
      taxes: shoppingHistoryadded.dataValues.taxes,
      totalAmount: shoppingHistoryadded.dataValues.totalAmount,
      UserIdUser: shoppingHistoryadded.dataValues.UserIdUser,
      status: shoppingHistoryadded.dataValues.status
    });

    // if (shoppingHistoryadded?.dataValues.IDShopHistory) throw new Error("Falta informacion para crear el historial");

    // const res = {
    //   IDShopHistory: shoppingHistoryadded[0].dataValues.IDShopHistory,
    //   operationId: shoppingHistoryadded[0].dataValues.operationId,
    //   paymentMethod: shoppingHistoryadded[0].dataValues.paymentMethod,
    //   paymentMethodId: shoppingHistoryadded[0].dataValues.paymentMethodId,
    //   netAmount: shoppingHistoryadded[0].dataValues.netAmount,
    //   taxes: shoppingHistoryadded[0].dataValues.taxes,
    //   totalAmount: shoppingHistoryadded[0].dataValues.totalAmount,
    //   UserIdUser: shoppingHistoryadded.dataValues.UserIdUser,
    //   status:shoppingHistoryadded[0].dataValues.status
    // };
    console.log('78', shoppingHistoryadded)
    const buyOrders = await Promise.all(response.response.additional_info.items.map(async item => {
      console.log('80', item);
      try {

        const buyProduct = await models.BuyOrders.findOrCreate({
          where: {
            id_product: item.id,
            ShoppingHistoryIDShopHistory: shoppingHistoryadded.dataValues.IDShopHistory,
            title: item.title,
            unit_price: item.unit_price,
            quantity: item.quantity,
          },
        })
        console.log('94', buyProduct);
        return buyProduct.dataValues
      } catch (error) {
        console.log('97', error.message);
      }
    }))

    console.log(buyOrders);

    return { ...res, buyOrders };
  } catch (error) {
    // console.log(error);
    throw new Error("Algo salio mal");
  }
};
