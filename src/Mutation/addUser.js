import { models } from "../db.js";

export const addUser = async (root, args) => {
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
  try {
    const user = await models.User.findOrCreate({
      where: {
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
        profilePicture: profilePicture || null,
        afipCondition,
        typeUser,
      },
   
    });
    if(!user) throw new Error(error.message)

        return user[0].dataValues

  } catch (error) {
    throw new Error(error.message)
  }
};
