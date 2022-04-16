import {gql} from 'apollo-server-express';

export default gql`
  extend type Query {
    user(id: ID!): User
    login(username: String!, password: String!): User
  }
  
  extend type Mutation {
    registerUser(
      username: String!,
      password: String!
    ): User
    
    addUserInfo(
        firstName: String,
        lastName: String,
        description: String,
    ): User

  }
  
  type User {
    id: ID,
    username: String,
    token: String,
    firstName: String,
    lastName: String,
    description: String
  }
`;