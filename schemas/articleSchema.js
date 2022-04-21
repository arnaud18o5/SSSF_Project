import {gql} from 'apollo-server-express';

export default gql`
  extend type Query {
    article(id: ID!): Article
    getAllArticlesOf(id: ID!): [Article]
  }
  
  extend type Mutation {
    postArticle(
        title: String!,
        text: String!
    ): Article

  }
  
  type Article {
    id: ID,
    author: ID,
    title: String,
    text: String,
    date: String
  }
`;