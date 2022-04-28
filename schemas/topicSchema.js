import {gql} from 'apollo-server-express';

export default gql`
  extend type Query {
      getAllTopics: [Topic]
  }
  
  extend type Mutation {
      createTopic(name: String!): Topic
  }
  
  type Topic {
    id: ID!,
    name: String!
  }
`;