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