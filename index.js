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

conn.sync({ force: true }).then(async () => {
  const material = await Promise.all(Materials.map(async m => await models.Materials.findOrCreate({
    where: {
      ...m
    },
  })))

  // Obtengo los id de todos los materiales
  const materialsId = material.map(id => id[0].dataValues.id)

  // Hago un nuevo recorrido pero ahora de los materiales que dependen de los primeros
  const subMaterial = await Promise.all(SubMaterials.map(async (sub, index) => await models.SubMaterials.findOrCreate({
    where: {
      ...sub,
      MaterialId: materialsId[index]
    }
  })))

  const subMaterialsId = subMaterial.map(sub => (
    { id: sub[0].dataValues.id, materialId: sub[0].dataValues.MaterialId }
  ))

  // Recorrido para hacer usuarios
  const userss = await Promise.all(Users.map(async (user, i) => {
    const {
      name,
      lastname,
      email,
      password,
    } = user;
    const pass = await bcrypt.hash(password, 8);
    const users = await models.User.findOrCreate({
      where: {
        name,
        lastname,
        email,
        password: pass
      },
    })

    await models.Profile.findOrCreate({
      where: {
        ...Profile[i],
        UserIdUser: users[0].dataValues.idUser
      }
    })

    await Promise.all(Products.map(async p => {
      const product = await models.Product.create({
        ...p,
        UserIdUser: users[0].dataValues.idUser
      })
      // Relacion aleatoria de cada producto con un o dos materiales
      const randomMaterial = Math.floor(Math.random() * materialsId.length)
      const random2Material = Math.floor(Math.random() * materialsId.length)
      if (random2Material !== randomMaterial) await product.addMaterials([materialsId[randomMaterial], materialsId[random2Material]])
      else await product.addMaterials([materialsId[randomMaterial]])
    
      const randomSubMaterial = subMaterialsId.find(sub => sub.materialId === materialsId[randomMaterial])
      await product.addSubMaterials([randomSubMaterial.id])
    }
    ))
  }))

  try {
    const { url } = await server.listen()
    console.log(`Server ready at ${url}`)

  } catch (error) {
    console.log(error.message);
  }

}).catch(error => {

  console.log(error.message);

})