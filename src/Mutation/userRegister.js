import jwt from 'jsonwebtoken'
import { transporter } from '../../config/nodemailer.js'
import 'dotenv/config'

export const userRegister = async (_, args) => {
    const { GMAIL } = process.env
    const token = jwt.sign(args, '123')

    await transporter.sendMail({
        from: `Message from <${GMAIL}>`,
        to: `${args.email}`,
        html: `
        <h1>this is your token:</h1>
        <a href="http://localhost:3000/${token}" ><button>Verify</button></a>
        `
    })
    return { ...args, token }

}