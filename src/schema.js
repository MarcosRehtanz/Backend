import { gql } from "apollo-server";
import { QueryType } from "./Query/Query.js";
import { MutationType } from "./Mutation/Mutation.js";


export const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
        password: String!
    }

    ${QueryType}
    ${MutationType}
`