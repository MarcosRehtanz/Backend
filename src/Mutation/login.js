import jwt from "jsonwebtoken";
import { models } from "../db.js";
import "dotenv/config";
import bcrypt from "bcryptjs";
import axios from "axios";

export const login = async (_, args) => {
    const { email, password } = args;

    if (!email || !password) throw new Error("faltan datos");

    try {
      const existingUser = await models.User.findOne({where:{ email }});

      if (!existingUser)
        throw new Error("El usuario no exista en la base de datos");

      const isPasswordOk = await bcrypt.compare(
        password,
        existingUser.dataValues.password
      );

      if (!isPasswordOk) throw new Error("No coincide la contraseña");

      const token = jwt.sign(
        {
          idUser: existingUser.dataValues.idUser,
          email: existingUser.dataValues.email,
        },
        process.env.JWT_PRIVATE_KEY
      );

      const obj = {
        __typename: "UserWithToken",
        ...existingUser.dataValues,
        userJwtToken: {
          token: token,
        },
      };
      return obj;
    } catch (error) {
        throw new Error (error.message)
    }
  
};
