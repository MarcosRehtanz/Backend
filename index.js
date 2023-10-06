import { ApolloServer } from "apollo-server";
import bcrypt from "bcryptjs";
import { conn } from './src/db.js'
import { typeDefs } from "./src/schema.js";
import { resolvers } from "./src/resolvers.js";
import { Users } from "./src/utils/Users.js"
import { Products } from "./src/utils/Products.js"
import { Materials } from "./src/utils/Materials.js"
import { SubMaterials } from "./src/utils/SubMaterials.js";
import { Profile } from "./src/utils/Profile.js";
import { models } from "./src/db.js";
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

conn.sync({ force: false }).then(async () => {
  // const material = await Promise.all(Materials.map(async m => await models.Materials.findOrCreate({
  //   where: {
  //     ...m
  //   },
  // })))

  // // Obtengo los id de todos los materiales
  // const materialsId = material.map(id => id[0].dataValues.id)

  // // Hago un nuevo recorrido pero ahora de los materiales que dependen de los primeros
  // await Promise.all(SubMaterials.map(async (sub, index) => await models.SubMaterials.findOrCreate({
  //   where: {
  //     ...sub,
  //     MaterialId: materialsId[index]
  //   }
  // })))

  // // Recorrido para hacer usuarios
  // const userss = await Promise.all(Users.map(async (user, i) => {
  //   const {
  //     name,
  //     lastname,
  //     email,
  //     password,
  //   } = user;
  //   const pass = await bcrypt.hash(password, 8);
  //   const users = await models.User.findOrCreate({
  //     where: {
  //       name,
  //       lastname,
  //       email,
  //       password: pass
  //     },
  //   })

  //   await models.Profile.findOrCreate({
  //     where: {
  //       ...Profile[i],
  //       UserIdUser: users[0].dataValues.idUser
  //     }
  //   })

  //   await Promise.all(Products.map(async p => await models.Product.findOrCreate({
  //     where: {
  //       ...p,
  //       UserIdUser: users[0].dataValues.idUser
  //     }
  //   })))
  // }))

  try {
    const { url } = await server.listen()
    console.log(`Server ready at ${url}`)

  } catch (error) {
    console.log(error.message);
  }

}).catch(error => {

  console.log(error.message);

})