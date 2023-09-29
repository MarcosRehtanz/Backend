import jwt from "jsonwebtoken";
import { models } from "../db.js";
import "dotenv/config";
import bcrypt from "bcryptjs";
import axios from "axios";

export const login = async (_, args) => {
  if (args.googleAccessToken) {
    const { googleAccessToken } = args;
    axios
      .get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          "Authorization": `Bearer ${googleAccessToken}`
            }
      })
      .then(async (response) => {
        const firstName = response.data.given_name;
        const lastName = response.data.family_name;
        const email = response.data.email;

        const existingUser = await models.User.findOne({ where: { email } });

        if (!existingUser) throw new Error("Usuario no registrado");

        const token = jwt.sign(
          {
            email: existingUser.dataValues.email,
            id: existingUser.dataValues.idUser,
          },
          config.get(process.env.JWT_PRIVATE_KEY),
          { expiresIn: "1h" }
        );

        const obj = {
          __typename: "UserWithToken",
          ...userToCreate.dataValues,
          userJwtToken: {
            token: token,
          },
        };
        return obj;
      })
      .catch((err) => {
        throw new Error("Invalid access token!");
      });
  } else {
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
  }
};
