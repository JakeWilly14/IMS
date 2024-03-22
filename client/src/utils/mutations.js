import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation SignUp(
    $fullName: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    signUp(
      fullName: $fullName
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation AddFriend(
    $userId: ID!, 
    $friendId: ID!) {
    addFriend(
      userId: $userId, 
      friendId: $friendId
    ) {
      success
      message
    }
  }
`;

export const REMOVE_FRIEND = gql`
  mutation RemoveFriend(
    $userId: ID!, 
    $friendId: ID!) {
    removeFriend(
      userId: $userId, 
      friendId: $friendId
    ) {
      success
      message
    }
  }
`;

export const CREATE_CONVERSATION = gql`
  mutation CreateConversation(
    $participant1Id: ID!, 
    $participant2Id: ID!
  ) {
    createConversation(
      participant1Id: $participant1Id, 
      participant2Id: $participant2Id
    ) {
      _id
      participants {
        _id
      }
      messages {
        _id
      }
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage(
    $senderId: ID!
    $receiverId: ID!
    $messageContent: String!
  ) {
    sendMessage(
      senderId: $senderId
      receiverId: $receiverId
      messageContent: $messageContent
    ) {
      _id
      senderId
      receiverId
      messageContent
      createdAt
    }
  }
`;