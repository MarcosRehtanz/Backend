import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { transporter } from '../../config/nodemailer.js'
import {models} from '../db.js'
import bcrypt from 'bcryptjs'

export const userRegister = async (_, args) => {
    const { GMAIL } = process.env
    const { idUser,
            name,
            lastname,
            email,
            password
            } = args
    const emailToValidate = models.User.findOne(
            idUser,
            name,
            lastname,
            password,
            {where:email}
        )
        if(emailToValidate){
           throw new Error ('Este email está en uso. Accede a tu cuenta e inicia sesión')
        }
    const pass = await bcrypt.hash(password, 8);
    const token = jwt.sign(
            {  
            idUser,
            name,
            lastname,
            password: pass
            }, 
        process.env.JWT_PRIVATE_KEY)
    await transporter.sendMail({
        from: `Mercado de Residuos <${GMAIL}>`,
        to: `${email}`,
        html: `
        <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#fafafa"> <tbody><tr> <td valign="top" style="padding:0;Margin:0"> <table cellpadding="0" cellspacing="0" class="m_1467742517444429127es-content" align="center" style="border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed!important"> <tbody><tr> <td align="center" style="padding:0;Margin:0"> <table bgcolor="#ffffff" class="m_1467742517444429127es-content-body" align="center" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;background-color:#ffffff;width:600px"> <tbody><tr> <td align="left" style="Margin:0;padding-top:30px;padding-right:20px;padding-bottom:30px;padding-left:20px"> <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;border-spacing:0px"> <tbody><tr> <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;border-spacing:0px"> <tbody><tr> <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px;font-size:0px">
            <img src="https://ci5.googleusercontent.com/proxy/5EhHrHF8Te52yYu2Bte8h9H4yFaVOv-dszNhf9O7p1g5StYO3XEwm_8Bp7gqm-IinVLZdZOi4hmeho1RXJ0N13GACXVCbeNDCc9bYAUjqE6kBSEy6T5oAxx_ToRnDXQwq10iOK8F6AP3lolpxcs3fxfdPH38hfV1zCYeEcBZTmO-Mg_deGs-N_yaHIAL2Zy_xMaUO8yJxzJ_cw=s0-d-e1-ft#https://ecfcqcs.stripocdn.email/content/guids/CABINET_0daf768196964ede62890861ac11f4bca0e15aa70c8f9edaedec9494ac2a3c22/images/logo.png" alt="" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none" width="300" class="CToWUd" data-bit="iit">
        </td> </tr> <tr> <td align="center" class="m_1467742517444429127es-m-txt-c" style="padding:0;Margin:0;padding-bottom:10px">
            <h6 style="Margin:0;font-family:arial,'helvetica neue',helvetica,sans-serif;letter-spacing:0;font-size:46px;font-style:normal;font-weight:normal;line-height:46px;color:#333333">Confirma tu correo</h6>
        </td> </tr> <tr> <td align="center" style="Margin:0;padding-top:5px;padding-right:40px;padding-bottom:5px;padding-left:40px">
            <p style="Margin:0;font-family:arial,'helvetica neue',helvetica,sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">Recibiste este mensaje porque tu dirección de correo electrónico se registró en nuestro sitio. Haga clic en el botón a continuación para verificar su dirección de correo electrónico y confirmar que es el propietario de esta cuenta.</p>
        </td> </tr> <tr> <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:5px">
            <p style="Margin:0;font-family:arial,'helvetica neue',helvetica,sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">Si no se registró con nosotros, ignore este correo electrónico.</p>
        </td> </tr> <tr> <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px">
            <span class="m_1467742517444429127es-button-border" style="border-style:solid;border-color:#2cb543;background:#5c68e2;border-width:0px;display:inline-block;border-radius:6px;width:auto">
                <a href="http://localhost:5173/verify?key=${token}" class="m_1467742517444429127es-button" style="text-decoration:none!important;color:#ffffff;font-size:20px;padding:10px 30px 10px 30px;display:inline-block;background:#5c68e2;border-radius:6px;font-family:arial,'helvetica neue',helvetica,sans-serif;font-weight:normal;font-style:normal;line-height:24px!important;width:auto;text-align:center;letter-spacing:0;border-left-width:30px;border-right-width:30px" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://localhost:5173/verify&amp;source=gmail&amp;ust=1696696216333000&amp;usg=AOvVaw3NKp5kPCETgHDrNmRglYyR">
                    Confirmar email
                </a>
            </span>
        </td> </tr> <tr> <td align="center" style="Margin:0;padding-top:5px;padding-right:40px;padding-bottom:5px;padding-left:40px">
            <p style="Margin:0;font-family:arial,'helvetica neue',helvetica,sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">
                Una vez confirmado, este correo electrónico se asociará de forma exclusiva con su cuenta
            </p>
        </td> </tr> </tbody></table></td> </tr> </tbody></table></td> </tr> </tbody></table></td> </tr> </tbody></table></td> </tr> </tbody></table>`
    })
    return { ...args, token }

}