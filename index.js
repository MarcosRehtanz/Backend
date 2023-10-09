import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import express from "express";
import http from "http";
import bcrypt from "bcryptjs";
import { conn } from "./src/db.js";
import { typeDefs } from "./src/schema.js";
import { resolvers } from "./src/resolvers.js";
import { Users } from "./src/utils/Users.js";
import { Products } from "./src/utils/Products.js";
import { Materials } from "./src/utils/Materials.js";
import { SubMaterials } from "./src/utils/SubMaterials.js";
import { Profile } from "./src/utils/Profile.js";
import { models } from "./src/db.js";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import mercadopago from "mercadopago";

async function startApolloServer() {
  const app = express();
  // Express 4.0
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });
  await server.start();
   server.applyMiddleware({ app, path: "/" });
  
  app.use(cors());
  app.use(morgan("dev"));


  app.post("/webhook", async (req, res) => {
    const { query } = req;

    const topic = query.topic || query.type;

    try {
      if (!query.email || query.email === "undefined")
        return res.sendStatus(200);

      if (topic === "payment") {
        const { ACCESS_TOKEN_MP } = process.env;
        mercadopago.configure({
          access_token: ACCESS_TOKEN_MP,
        });

        const id = query["data.id"];
        const email = query.email;

        const response = await mercadopago.payment.findById(Number(id));
        console.log(response.body);
        const user = await models.User.findOne({
          where: { email },
        });
        if (!user)
          throw new Error(
            "usuario no registado en la base de datos. Inicie sesion con su email para continuar"
          );

        const shoppingHistoryadded = await models.ShoppingHistory.findOrCreate({
          where: {
            operationId: id,
            paymentMethod: response.body.payment_type_id,
            paymentMethodId: response.body.payment_method_id,
            netAmount: response.body.transaction_details.net_received_amount,
            taxes: response.body.taxes_amount,
            totalAmount: response.body.transaction_amount,
            status:response.body.status,
            UserIdUser: user.dataValues.idUser,
          },
        });
        if (!shoppingHistoryadded)
          throw new Error("Falta informacion para crear el historial");

        
        const buyOrders = await Promise.all(
          response.response.additional_info.items.map(async (item) => {
            const buyProduct = await models.BuyOrders.findOrCreate({
              where: {
                id_product: item.id,
                title: item.title,
                unit_price: item.unit_price,
                quantity: item.quantity,
                ShoppingHistoryIDShopHistory:
                  shoppingHistoryadded[0].dataValues.IDShopHistory,
              },
            });
            return buyProduct.dataValues;
          })
        );
        const res = {
          IDShopHistory: shoppingHistoryadded[0].dataValues.IDShopHistory,
          operationId: shoppingHistoryadded[0].dataValues.operationId,
          paymentMethod: shoppingHistoryadded[0].dataValues.paymentMethod,
          paymentMethodId: shoppingHistoryadded[0].dataValues.paymentMethodId,
          netAmount: shoppingHistoryadded[0].dataValues.netAmount,
          taxes: shoppingHistoryadded[0].dataValues.taxes,
          totalAmount: shoppingHistoryadded[0].dataValues.totalAmount,
          UserIdUser: shoppingHistoryadded[0].dataValues.UserIdUser,
        };
        return { ...res, buyOrders };
      }
      return res.sendStatus(200);
    } catch (error) {
      console.log(error.message);
    }
  });
  conn
    .sync({ force: true })
    .then(async () => {
      // const material = await Promise.all(
      //   Materials.map(
      //     async (m) =>
      //       await models.Materials.findOrCreate({
      //         where: {
      //           ...m,
      //         },
      //       })
      //   )
      // );

      // Obtengo los id de todos los materiales
      // const materialsId = material.map((id) => id[0].dataValues.id);

      // Hago un nuevo recorrido pero ahora de los materiales que dependen de los primeros
      // const subMaterial = await Promise.all(
      //   SubMaterials.map(
      //     async (sub, index) =>
      //       await models.SubMaterials.findOrCreate({
      //         where: {
      //           ...sub,
      //           MaterialId: materialsId[index],
      //         },
      //       })
      //   )
      // );

      // const subMaterialsId = subMaterial.map((sub) => ({
      //   id: sub[0].dataValues.id,
      //   materialId: sub[0].dataValues.MaterialId,
      // }));

      // Recorrido para hacer usuarios
      // const userss = await Promise.all(
      //   Users.map(async (user, i) => {
      //     const { name, lastname, email, password, role } = user;
      //     const pass = await bcrypt.hash(password, 8);
      //     const users = await models.User.findOrCreate({
      //       where: {
      //         name,
      //         lastname,
      //         email,
      //         password: pass,
      //         role,
      //       },
      //     });

          // await models.Profile.findOrCreate({
          //   where: {
          //     ...Profile[i],
          //     UserIdUser: users[0].dataValues.idUser,
          //   },
          // });

          // await Promise.all(
          //   Products.map(async (p) => {
          //     const product = await models.Product.create({
          //       ...p,
          //       UserIdUser: users[0].dataValues.idUser,
          //     });
          //     // Relacion aleatoria de cada producto con un o dos materiales
          //     const randomMaterial = Math.floor(
          //       Math.random() * materialsId.length
          //     );
          //     const random2Material = Math.floor(
          //       Math.random() * materialsId.length
          //     );
          //     if (random2Material !== randomMaterial)
          //       await product.addMaterials([
          //         materialsId[randomMaterial],
          //         materialsId[random2Material],
          //       ]);
          //     else await product.addMaterials([materialsId[randomMaterial]]);

          //     const randomSubMaterial = subMaterialsId.find(
          //       (sub) => sub.materialId === materialsId[randomMaterial]
          //     );
          //     await product.addSubMaterials([randomSubMaterial.id]);
          //   })
          // );
        // })
      // );

      try {
        // const { url } = await server.listen()
        // console.log(`Server ready at ${url}`)
      } catch (error) {
        console.log(error.message);
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
  await new Promise((resolve) => httpServer.listen({ port: process.env.PORT || 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer();
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,

// })
