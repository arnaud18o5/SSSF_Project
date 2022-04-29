import {gql} from 'apollo-server-express';

export default gql`

type Topic {
    id: ID,
    name: String
  }

  extend type Query {
    article(id: ID!): Article
    getAllArticlesOf(id: ID!): [Article]
    getLastArticles(number: Int): [Article]
  }
  
  extend type Mutation {
    postArticle(
        title: String!,
        text: String!,
        topics: [ID],
        headPicture: String
    ): Article

    postComment(articleID:ID!, text:String!) : Article
    removeComment(articleID:ID!, commentID:ID!) : Article
    like(articleID:ID!) : Article
    dislike(articleID:ID!) : Article
  }
  
  type Article {
    id: ID,
    author: User,
    headPicture: String,
    title: String,
    text: String,
    date: String,
    comments: [Comment],
    likes: [Like],
    dislikes: [Like],
    topics: [Topic]
  }

  type Comment {
    id: ID,
    author: ID,
    text: String,
    date: String
  }

  type Like {
    usr: LikeUser
  }

  type LikeUser {
    _id: ID,
    username: String,
    firstName: String,
    lastName: String,
    avatar :  String,
  }
  
`;