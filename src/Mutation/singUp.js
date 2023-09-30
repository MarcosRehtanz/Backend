import jwt from "jsonwebtoken";
import { models } from "../db.js";
import "dotenv/config";
import bcrypt from "bcryptjs";
import axios from "axios";
import { user } from "../Models/User.js";

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

        const userToCreate = await models.User.create({
          name,
          lastname,
          email,
        });
        const profileCreate = await models.Profile.create({
          userName: "userName",
          cuitCuil: "cuitCuil",
          phone: "phone",
          address:"address",
          postalCode: "postalCode",
          description:"description",
          typeUser:"comprador",
          afipCondition:"Fisica",
          UserIdUser: userToCreate.dataValues.idUser
        })
        if(!profileCreate) throw new Error ("no se pudo completar el perfil");

        const token = jwt.sign({
          email: result.email,
          id: userToCreate.dataValues.id
      }, config.get(process.env.JWT_PRIVATE_KEY), {expiresIn: "1h"})

      const obj = {
      ...userToCreate.dataValues,
      profile: {...profileCreate.dataValues},
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
        name,
        lastname,
        email,
        password,
      } = args;
      const isUserExists = await models.User.findOne({ where: { email } });

      if (isUserExists) {
        throw new Error("El usuario ya esta creado");
      }
      if(!password) throw new Error("Se requiere password para continuar")
      const pass = await bcrypt.hash(password, 8);
      const userToCreate = await models.User.create({
        name,
        lastname,
        email,
        password: pass,
        
      });

      if (!userToCreate) throw new Error("No se pudo crear el usuario");
      
      const profileCreate = await models.Profile.create({
        userName: "userName",
        cuitCuil: "cuitCuil",
        phone: "phone",
        address:"address",
        postalCode: "postalCode",
        description:"description",
        typeUser:"comprador",
        afipCondition:"Fisica",
        UserIdUser: userToCreate.dataValues.idUser
      })

      if(!profileCreate) throw new Error ("no se pudo completar el perfil");
      console.log(userToCreate.dataValues.idUser)
      console.log(userToCreate)
      const token = jwt.sign(
        {
          idUser: userToCreate.dataValues.idUser,
          email: userToCreate.dataValues.email,
        },
        process.env.JWT_PRIVATE_KEY
      );
      if (!token) throw new Error("El token no se generó correctamente");

      const obj = {
      ...userToCreate.dataValues,
      profile: {...profileCreate.dataValues},
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
