import axios from "axios";
import mercadopago from "mercadopago";

const { ACCESS_TOKEN_MP } = process.env;

mercadopago.configure({
  access_token: ACCESS_TOKEN_MP,
});

export const feedbackMercadoPago = async (_, args) => {
  const { payment_id, status, merchant_order_id } = args.success;

  const res = {
    payment: payment_id,
    status: status,
    merchant_order_id: merchant_order_id,
  };

  
  return res;
};
