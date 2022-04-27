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

    postComment(articleID:ID!, text:String!) : Article
    removeComment(articleID:ID!, commentID:ID!) : Article
    like(articleID:ID!) : Article
    dislike(articleID:ID!) : Article
  }
  
  type Article {
    id: ID,
    author: ID,
    title: String,
    text: String,
    date: String,
    comments: [Comment],
    likes: [Like],
    dislikes: [Like]
  }

  type Comment {
    id: ID,
    author: ID,
    text: String,
    date: String
  }

  type Like {
    author: ID
  }
`;