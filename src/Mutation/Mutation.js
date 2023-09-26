import { gql } from "apollo-server";
import { addUser } from "./addUser.js";

export const MutationType = gql`
    type Mutation {
        addUser: [String]
    }
`

export const Mutation = {
    addUser,
}