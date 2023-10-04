import "dotenv/config";
import mercadopago from "mercadopago";

const { ACCESS_TOKEN } = process.env;

mercadopago.configure({
  access_token:
    "TEST-7139552295917095-100300-901bdf63f1757af25b5538b6faf872e4-1327154320",
});

export const orderMercadoPago = async (_, args) => {
  try {
    console.log(args);
    const prod = args.product;
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
    };
    const IdCurr = prod.map((p) => p.currencyId);
    const response = await mercadopago.preferences.create(preference);
    console.log(prod);
    const res = {
      products: prod,
      currency_id: IdCurr,
      response: JSON.stringify(response),
    };

    return res;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
