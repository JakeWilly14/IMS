const typeDefs = `
  type User {
    _id: ID
    fullName: String
    username: String
    email: String
    password: String
    confirmPassword: String
    avatarPic: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user(username: String!): User 
  }

  type Mutation {
    addUser(
      fullName: String!
      username: String!
      email: String!
      password: String!
      confirmPassword: String!
      avatarPic: String
    ): Auth
    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String
    ): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;