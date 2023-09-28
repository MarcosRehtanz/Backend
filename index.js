import { ApolloServer } from "apollo-server";
import { conn } from './src/db.js'
import { typeDefs } from "./src/schema.js";
import { resolvers } from "./src/resolvers.js";

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

conn.sync({ force: false }).then(async () => {

    try {
        const { url } = await server.listen()
        console.log(`Server ready at ${url}`)

    } catch (error) {
        console.log(error.message);
    }

}).catch(error => {

    console.log(error.message);

})