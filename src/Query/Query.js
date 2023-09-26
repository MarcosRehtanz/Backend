import { gql } from "apollo-server";
import { allUsers } from "./allUsers.js";

export const QueryType = gql`
    type Query {
        allUsers: [User]
    }
`

export const Query = {
    allUsers
}