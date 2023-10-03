import 'dotenv/config'
import mercadopago from 'mercadopago'

const { ACCESS_TOKEN } = process.env

mercadopago.configure({
    access_token: 'TEST-7139552295917095-100300-901bdf63f1757af25b5538b6faf872e4-1327154320'
})

export const orderMercadoPago = async (_, args) => {

    try {
        const {
            id,
            title, 
            picture_url,
            unit_price,
            currency_id,
            quantity,
            description,
        } = args

        

        let preference = {
            items: id.map((idProduct, i) => ({
                id: idProduct,
                title: title[i],
                picture_url: picture_url[i] ,
                unit_price: unit_price[i],
                currency_id: currency_id[i],
                quantity: quantity[i],
                description: description[i],
            }))

        };

        const response = await mercadopago.preferences.create(preference);


        const res = {
            id,
            title,
            picture_url,
            unit_price,
            currency_id,
            quantity,
            description,
            response: JSON.stringify(response),
        }

        return res
    } catch (error) {
        console.log(error);
        throw new Error(error)
    }

}