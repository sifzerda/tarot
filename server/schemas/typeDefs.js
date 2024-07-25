const typeDefs = `

  type User {
    _id: ID
    username: String
    email: String
    password: String
    solScore: [SolScore]
  }

      type SolScore {
    solTimeTaken: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(userId: ID!): User
    users: [User]
    me: User
    getSolScore(userId: ID!): [SolScore]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(username: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
    removeUser: User
    saveSolScore(userId: ID!, solTimeTaken: Int!): User
  }
`;

module.exports = typeDefs;
