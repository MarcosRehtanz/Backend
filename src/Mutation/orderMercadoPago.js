import "dotenv/config";
import mercadopago from "mercadopago";

const { ACCESS_TOKEN_MP } = process.env;


export const orderMercadoPago = async (_, args) => {
  //console.log("first")
  mercadopago.configure({
    access_token:ACCESS_TOKEN_MP
     
  });

  try {
    console.log(args.email);
    const prod = args.product;

    const IdCurr = prod.map((p) => p.currencyId);
   
    const response = await mercadopago.preferences.create({
      items: prod.map((p, i) => ({
        id: p.idProduct,
        title: p.name,
        picture_url: p.productImage,
        description: p.description,
        unit_price: p.price,
        currency_id: p.currencyId,
        quantity: p.quantity,
      })),
      back_urls: {
        success: `${process.env.URL_FRONT}/success`,
        failure: `${process.env.URL_FRONT}/failure`,
        pending: `${process.env.URL_FRONT}/pending`,
      },
      auto_return:"approved",
      notification_url: `${process.env.URL_BACK}/webhook?email=${args.email}`
    });

    const res = {
      products: prod,
      currency_id: IdCurr,
      response: response.body.id,
      init_point: response.body.init_point
    };
   // console.log(response.body.id)
    return res;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
