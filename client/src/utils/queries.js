import { gql } from '@apollo/client';

export const SEARCH_USER = gql`
  query SearchUser($username: String!) {
    user(username: $username) {
      _id
      fullName
      username
      email
      avatarPic
    }
  }
`;

export const GET_USER_FRIENDS = gql`
  query GetUserFriends($userId: ID!) {
    getUserFriends(userId: $userId) {
      _id
      fullName
      username
      email
      avatarPic
    }
  }
`;

export const GET_CONVERSATION = gql`
  query GetConversation($conversationId: ID!) {
    conversation(conversationId: $conversationId) {
      _id
      participants {
        _id
        fullName
        username
        email
        avatarPic
      }
      messages {
        _id
        senderId
        receiverId
        messageContent
      }
    }
  }
`;
