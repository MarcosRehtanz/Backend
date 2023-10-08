import jwt from "jsonwebtoken";
import { models } from "../db.js";
import "dotenv/config";
// import bcrypt from "bcryptjs";

export const signUp = async (_, args) => {
  //creacion de usuario propio de MdR
  try {
    
    const reqToken = args.token
    if (!reqToken) throw new Error("No llego el token");

    const decodeToken = jwt.verify(reqToken, process.env.JWT_PRIVATE_KEY);

    if (!decodeToken) throw new Error("no se decodifico el token");

    const isUserExists = await models.User.findOne({ where: { email: decodeToken.email } });

    if (isUserExists) {
      throw new Error("El usuario ya esta creado, por favor inicia sesión");
    }
    if (!decodeToken.password) throw new Error("Se requiere password para continuar");
    //const pass = await bcrypt.hash(decodeToken.password, 8);
    const userToCreate = await models.User.create({
      name:decodeToken.name,
      lastname: decodeToken.lastname,
      email: decodeToken.email,
      password: decodeToken.password
    });

    if (!userToCreate) throw new Error("No se pudo crear el usuario");

    const profileCreate = await models.Profile.create({
      userName: "userName",
      cuitCuil: "cuitCuil",
      phone: "phone",
      address: "address",
      postalCode: "postalCode",
      description: "description",
      typeUser: "comprador",
      afipCondition: "Fisica",
    });

    if (!profileCreate) throw new Error("no se pudo completar el perfil");
    userToCreate.setProfile(profileCreate);
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
      token,
    };

    return obj;
  } catch (error) {
    throw new Error(error.message);
  }
};
