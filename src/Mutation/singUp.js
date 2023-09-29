import jwt from "jsonwebtoken";
import { models } from "../db.js";
import "dotenv/config";
import bcrypt from "bcryptjs";
import axios from "axios";

export const signUp = async (_, args) => {
  if (args.googleAccessToken) {
    //creacion de usuario con google
    const { googleAccessToken } = args;
    axios
      .get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${googleAccessToken}`,
        },
      })
      .then(async (response) => {
        const name = response.data.given_name;
        const lastname = response.data.family_name;
        const email = response.data.email;
        const isUserExists = await models.User.findOne({ where: { email } });

        if (isUserExists) {
          // creacion de usuario con Google
          throw new Error("El usuario ya esta creado");
        }
        const {
          userName,
          cuitCuil,
          phone,
          address,
          postalCode,
          acountActive,
          termsAndCondsAprove,
          profilePicture,
          afipCondition,
          typeUser,
        } = args;

        const userToCreate = await models.User.create({
          userName,
          name,
          lastname,
          email,
          password: "create by Google",
          cuitCuil,
          phone,
          address,
          postalCode,
          acountActive,
          termsAndCondsAprove,
          profilePicture: profilePicture || null,
          afipCondition,
          typeUser,
        });

        const token = jwt.sign({
          email: result.email,
          id: result._id
      }, config.get(process.env.JWT_PRIVATE_KEY), {expiresIn: "1h"})

      const obj = {
        __typename: "UserWithToken",
        ...userToCreate.dataValues,
        userJwtToken: {
          token: token,
        },
      };
      return obj;
      });
  } else {
    //creacion de usuario propio de MdR
    try {
      const {
        userName,
        name,
        lastname,
        email,
        password,
        cuitCuil,
        phone,
        address,
        postalCode,
        acountActive,
        termsAndCondsAprove,
        profilePicture,
        afipCondition,
        typeUser,
      } = args;
      const isUserExists = await models.User.findOne({ where: { email } });

      if (isUserExists) {
        throw new Error("El usuario ya esta creado");
      }
      const pass = await bcrypt.hash(password, 8);
      const userToCreate = await models.User.create({
        userName,
        name,
        lastname,
        email,
        password: pass,
        cuitCuil,
        phone,
        address,
        postalCode,
        acountActive,
        termsAndCondsAprove,
        profilePicture: profilePicture || null,
        afipCondition,
        typeUser,
      });

      if (!userToCreate) throw new Error("No se pudo crear el usuario");

      const token = jwt.sign(
        {
          idUser: userToCreate.dataValues.idUser,
          email: userToCreate.dataValues.email,
        },
        process.env.JWT_PRIVATE_KEY
      );
      if (!token) throw new Error("El token no se generó correctamente");

      const obj = {
        __typename: "UserWithToken",
        ...userToCreate.dataValues,
        userJwtToken: {
          token: token,
        },
      };
      console.log(obj);
      return obj;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};
