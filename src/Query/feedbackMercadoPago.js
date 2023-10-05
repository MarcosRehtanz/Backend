import axios from "axios";
import mercadopago from "mercadopago";

const { ACCESS_TOKEN_MP } = process.env;

mercadopago.configure({
  access_token: ACCESS_TOKEN_MP,
});

export const feedbackMercadoPago = (_, args) => {
  const {
    payment_id,
    status,
    merchant_order_id,
  } = args.success;

  const res = {
    payment:payment_id,
    status: status,
    merchant_order_id: merchant_order_id,
  };

  mercadopago.payment.findById(payment_id).then(res => console.log(res))

  mercadopago.card.get({customer_id:"7558667141552935", id:"master"}).then(resp=> console.log(resp))
 // mercadopago.merchant_orders.findById(merchant_order_id).then(res => console.log(res))
  return res;
};
