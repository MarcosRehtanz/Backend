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
            .then(async response => {
                const firstName = response.data.given_name;
                const lastName = response.data.family_name;
                const email = response.data.email;

                const existingUser = await User.findOne({where:{email}})

                if (!existingUser) throw new Error ("Usuario no registrado")
                

                const token = jwt.sign({
                    email: existingUser.dataValues.email,
                    id: existingUser.dataValues.idUser
                }, config.get(process.env.JWT_PRIVATE_KEY), {expiresIn: "1h"})
        
                const obj = {
                    __typename: "UserWithToken",
                    ...userToCreate.dataValues,
                    userJwtToken: {
                      token: token,
                    },
                  };
                  return obj;
            })
            .catch(err => {
                throw new Error ("Invalid access token!")
            })
  } else {
  }
};
