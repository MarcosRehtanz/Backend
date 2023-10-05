import "dotenv/config";
import mercadopago from "mercadopago";

const { ACCESS_TOKEN_MP } = process.env;

mercadopago.configure({
  access_token:ACCESS_TOKEN_MP
   
});

export const orderMercadoPago = async (_, args) => {
  try {
    console.log(args);
    const prod = args.product;
    const { success, failure, pending } = args;
    //console.log(prod)
    let preference = {
      items: prod.map((p, i) => ({
        id: p.id,
        title: p.name,
        picture_url: p.productImage,
        description: p.description,
        unit_price: p.price,
        currency_id: p.currencyId,
        quantity: p.quantity,
      })),
      back_urls: {
        success: success,
        failure: failure,
        pending: pending,
      },
      auto_return:"approved"
    };

    const IdCurr = prod.map((p) => p.currencyId);
   
    const response = await mercadopago.preferences.create(preference);

    const res = {
      products: prod,
      currency_id: IdCurr,
      response: response.body.id,
    };
    console.log(res)
    return res;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
