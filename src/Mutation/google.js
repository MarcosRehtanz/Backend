import { where } from "sequelize";
import { models } from "../db.js";

export const google = async (root, args) => {
  const { email, name, lastname } = args;
  if (!email || !name || !lastname) throw new Error("faltan datos");

  const findGoogleUser = await models.User.findOne({where: {
    email
  }})

  if (findGoogleUser) return findGoogleUser
  
  const createUserWithGoogle = await models.User.findOrCreate({where:{
    email, name, lastname, role: "user"
  }}) 

  if(!createUserWithGoogle) return ("usuario ya creado anteriormente");


  const profileCreate = await models.Profile.create({
    userName: "userName",
    cuitCuil: "cuitCuil",
    phone: "phone",
    address:"address",
    postalCode: "postalCode",
    description:"description",
    typeUser:"comprador",
    afipCondition:"Fisica",
   UserIdUser: createUserWithGoogle[0].dataValues.idUser
  })

  if(!profileCreate) throw new Error ("no se pudo completar el perfil");
  // createUserWithGoogle.setProfile(profileCreate)

  const res = {
    idUser: createUserWithGoogle[0].dataValues.idUser,
    name: createUserWithGoogle[0].dataValues.name,
    email:createUserWithGoogle[0].dataValues.email,
    lastname:createUserWithGoogle[0].dataValues.lastname,
    role:createUserWithGoogle[0].dataValues.role
  }

  return res
  

};
