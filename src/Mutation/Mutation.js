import { gql } from "apollo-server";
import { addUser } from "./addUser.js";

export const MutationType = gql`
    type Mutation {
        addUser(
            name: String!
            email: String!
            password: String!
        ): User
    }
`

export const Mutation = {
    addUser,
}