import jwt from 'jsonwebtoken'
import { transporter } from '../../config/nodemailer.js'
import 'dotenv/config'

export const userRegister = async (_, args) => {
    const { GMAIL } = process.env
    const token = jwt.sign(args, process.env.JWT_PRIVATE_KEY)

    await transporter.sendMail({
        from: `Message from <${GMAIL}>`,
        to: `${args.email}`,
        html: `
        <h1>this is your token:</h1>
        <a href="http://localhost:5173/verify?key=${token}" ><button>Verify</button></a>
        `
    })
    return { ...args, token }

}