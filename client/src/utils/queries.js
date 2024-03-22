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

export const GET_CONVERSATION_BY_PARTICIPANTS = gql`
  query GetConversationByParticipants($participant1Id: ID!, $participant2Id: ID!) {
    conversationByParticipants(participant1Id: $participant1Id, participant2Id: $participant2Id) {
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
