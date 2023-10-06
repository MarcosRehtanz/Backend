import "dotenv/config";
import mercadopago from "mercadopago";

const { ACCESS_TOKEN_MP } = process.env;


export const orderMercadoPago = async (_, args) => {
  console.log("first")
  mercadopago.configure({
    access_token:ACCESS_TOKEN_MP
     
  });

  try {
    console.log(args);
    const prod = args.product;

    const IdCurr = prod.map((p) => p.currencyId);
   
    const response = await mercadopago.preferences.create({
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
        success: "http://localhost:5173/success",
        failure: "http://localhost:5173/failure",
        pending: "http://localhost:5173/pending",
      },
      auto_return:"approved",
      notification_url: "https://18ca-2803-9800-9896-72a8-b0e0-3909-50c2-6b2b.ngrok.io/webhook"
    });

    const res = {
      products: prod,
      currency_id: IdCurr,
      response: response.body.id,
    };
    console.log(response.body.id)
    return res;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
