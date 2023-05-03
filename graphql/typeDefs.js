export  const typeDefs = `#graphql
type User {
    id: ID!
    username: String!
    password: String!
    email: String!
}

input UserToAdd {
    username: String!
    password: String!
    email: String!
}

type Query {
        users: [User]!
        user(userUSername: String!): User!
    }

type Mutation {
    addUser(userToAdd: UserToAdd!): User!
}
`;