const typeDefs = `
  type User {
    _id: ID
    fullName: String
    username: String
    email: String
    password: String
    avatarPic: String
    friends: [User]
    conversations: [Conversation]
  }

  type UpdatedFriends {
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
    me: User
    conversation(conversationId: ID!): Conversation
    conversations(username: String): [Conversation]
    message(messageId: ID!): Message
    messages(username: String): [Message] 
  }

  type Mutation {
    signUp(
      fullName: String!
      username: String!
      email: String!
      password: String!
    ): Auth
    login(
      email: String!, 
      password: String!
      ): Auth
    updateUser(
      username: String
      password: String
    ): User
    sendMessage(
      senderId: ID!
      receiverId: ID!
      messageContent: String!
    ): Message
    addFriend(
      userId: ID!
      friendId: ID!
    ): UpdatedFriends
    removeFriend(
      userId: ID!
      friendId: ID!
    ): UpdatedFriends
  }
`;

module.exports = typeDefs;