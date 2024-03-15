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
  }

  type AddFriendResponse {
    success: Boolean!
    message: String
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
    conversation(conversationId: ID!): Conversation
    conversations(username: String): [Conversation]
    message(messageId: ID!): Message
    messages(username: String): [Message] 
  }

  type Mutation {
    signup(
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
    login(
      email: String!, 
      password: String!
      ): Auth
    sendMessage(
      senderId: ID!
      receiverId: ID!
      messageContent: String!
    ): Message
    addFriend(
      userId: ID!
      friendId: ID!
    ): AddFriendResponse
  }
`;

module.exports = typeDefs;