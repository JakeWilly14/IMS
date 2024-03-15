const typeDefs = `
  type User {
    _id: ID
    fullName: String
    username: String
    email: String
    password: String
    confirmPassword: String
    avatarPic: String
    friends: [User]
    conversations: [Conversation]
    messages: [Message]
  }

  type Conversation {
    participants: [User]
    messages: [Message]
  }

  type Message {
    _id: ID
    senderId: ID
    receiverId: ID
    messageContent: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user(username: String!): User
    users: [User]
    conversation(_id: ID!): Conversation
    conversations(username: String): [Conversation]
    message(_id: ID!): Message
    messages(username: String): [Message] 
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
      username: String
      password: String
      confirmPassword: String
    ): User
    login(email: String!, password: String!): Auth
    sendMessage(
      senderId: ID!
      receiverId: ID!
      messageContent: String!
    ): Message
  }
`;

module.exports = typeDefs;