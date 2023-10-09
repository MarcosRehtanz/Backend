//NO TOCAAAAAAAAAAAAAAR 

import jwt from 'jsonwebtoken';
import { transporter } from '../../config/nodemailer.js';
import { models } from '../db.js';


export const initiatePasswordReset = async (_, args) => {
  const { GMAIL } = process.env;
  const { email } = args;

 
  const existingUser = await models.User.findOne({ where: { email } });
  if (!existingUser) {
    throw new Error('No user found with this email.');
  }

  try {

    const key = process.env.JWT_PRIVATE_KEY; // Esta vaina la pregunté a ChatGPT
    const expiresIn = '1h';  // Esta vaina la pregunté a ChatGPT x2

    //Lo copié mirando el signUp
    const token = jwt.sign({ email }, key, { expiresIn });

    // Lo ví de UserRegister Estilos ni mierda :( Auxiliooo
    const mailOptions = {
      from: `Mercado de Residuos <${GMAIL}>`,
      to: email,
      html: `
        <h2>Recibiste este mensaje porque solicitaste restablecer tu contraseña.</h2>
        <p>Haga clic en el siguiente enlace para restablecer su contraseña:</p>
        <a href="http://localhost:5173/reset-password?token=${token}">Restablecer Contraseña</a>
      `,
    };

    //Se supone que envío el email con esto
    await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: 'Se ha iniciado el restablecimiento de contraseña. Revisa tu email',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error al restablecer contraseña, inténtalo nuevamente',
    };
  }
};
//Que Cristo vaya conmigo :/