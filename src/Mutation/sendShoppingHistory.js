import 'dotenv/config'
import { transporter } from '../../config/nodemailer.js'
import { models } from '../db.js'


export const sendShoppingHistory = async (args)=>{
    try{
    const {email, idShoppingHistory  } = args;
    const {GMAIL} = process.env;
    const user = await models.User.findOne({where:{email}})
    if(!user) throw new Error("El usuario no existe")
    const shoppingHistoryadded = await models.ShoppingHistory.findOne({where:{IDShopHistory:idShoppingHistory }, include: {model: models.BuyOrders, include: {model: models.Product}} })


    await transporter.sendMail({
        from: `Mercado de Residuos <${GMAIL}>`,
            to: `${email}>`,
            subject: `Confirmacion de compra de mercadoderesiduos: ${email}`,
            html: ` <h1>Gracias por su compra</h1>
            <p>su numero de compra es: ${shoppingHistoryadded.operationId}</p> 
            <p>El estado de su compra es: ${shoppingHistoryadded.status}</p>
            <p>El monto total de su compra es: ${shoppingHistoryadded.totalAmount}</p>
            <p>El metodo de pago utilizado es: ${shoppingHistoryadded.paymentMethod}</p>
            <p>El metodo de pago utilizado es: ${shoppingHistoryadded.paymentMethodId}</p>

            <p>Los productos comprados son:</p>
            <ul>
            ${shoppingHistoryadded.BuyOrders.map((p)=>
            `<li>Producto:${p.title}</li>
            <li>Precio:${p.unit_price}</li>
            <li>Cantidad:${p.quantity}</li>
            `)}
            </ul>
    
            <p>Gracias por confiar en nosotros</p>
            <p>El equipo de Mercado de Residuos</p>`
    })
    return "Email enviado"

    }
    catch(error){
        console.log(error)
        throw new Error(error.message)
    }

        }
        