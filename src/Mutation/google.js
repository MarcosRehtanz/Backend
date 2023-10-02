import { models } from "../db.js";

export const google = async (root, args) => {
  const { email, name, lastname } = args;
  if (!email || !name || !lastname) throw new Error("faltan datos");

  const createUserWithGoogle = await models.User.findOrCreate({where:{
    email, name, lastname
  }}) 

  if(!createUserWithGoogle) return ("usuario ya creado anteriormente");

  const res = {
    idUser: createUserWithGoogle[0].dataValues.idUser,
    name: createUserWithGoogle[0].dataValues.name,
    email:createUserWithGoogle[0].dataValues.email,
    lastname:createUserWithGoogle[0].dataValues.lastname
  }

  return res
  

};
