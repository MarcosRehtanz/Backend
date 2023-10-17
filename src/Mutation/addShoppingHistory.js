import { models } from "../db.js";
import mercadopago from "mercadopago";
import "dotenv/config";
import { stock } from "./stock.js";
import { sendShoppingHistory } from "./sendShoppingHistory.js";

export const addShoppingHistory = async (root, args) => {

  const { payment_id, status, merchant_order_id, idUser } = args;
  try {
    if (!payment_id || !status || !merchant_order_id || !idUser)
      throw new Error("Faltan datos");
    const response = await mercadopago.payment.findById(payment_id);

    const user = await models.User.findOne({
      where: { idUser },
    });

    if (!user.dataValues)
      throw new Error(
        "usuario no registado en la base de datos. Inicie sesion con su email para continuar"
      );

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

    const buyOrders = await Promise.all(response.response.additional_info.items.map(async item => {

      try {

        await stock({ idProduct: item.id, quantity: item.quantity })
        const userSeller = await models.Product.findOne({where: { idProduct: item.id}})
        
        console.log('84', userSeller.dataValues.UserIdUser);

        const buyProduct = await models.BuyOrders.findOrCreate({
          where: {
            id_product: item.id,
            id_seller: userSeller.dataValues.UserIdUser,
            ShoppingHistoryIDShopHistory: shoppingHistoryadded.dataValues.IDShopHistory,
            title: item.title,
            unit_price: item.unit_price,
            quantity: item.quantity,
          },
        })

        await sendShoppingHistory({  email: user.dataValues.email, idShoppingHistory: shoppingHistoryadded.dataValues.IDShopHistory })

        return buyProduct.dataValues
      } catch (error) {

      }
    }))

 

    return { ...res, buyOrders };
  } catch (error) {

    throw new Error("Algo salio mal");
  }
};
