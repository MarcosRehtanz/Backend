import jwt from "jsonwebtoken";
import { models } from "../db.js";
import "dotenv/config";
import bcrypt from "bcryptjs"
export const signUp = async (_, args) => {
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
    const pass = await bcrypt.hash(password, 8)
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
    if(!token) throw new Error("El token no se generó correctamente")
    
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
};
