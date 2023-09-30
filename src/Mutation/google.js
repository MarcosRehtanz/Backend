import { models } from "../db.js";

export const google = async (root, args) => {
  const { email, name, lastname } = args;
  if (!email || !name || !lastname) throw new Error("faltan datos");

  const userGoogle = await models.User.findOne({
    where: { email },
  });
  if(userGoogle) return userGoogle.dataValues

  const createUserWithGoogle = await models.User.create({
    email, name, lastname
  }) 

  if(!createUserWithGoogle) throw new Error ("No se registro al usuario en la base de datos");

  

  return createUserWithGoogle.dataValues
  

};
