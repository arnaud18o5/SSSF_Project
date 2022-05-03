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
    getBestArticles(number: Int): [Article]
    getAllArticles(number: Int): [Article]
    getArticleByTopic(topicID:ID!): [Article]
    getArticleById(articleID:ID!):Article
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
    removeArticle(articleID:ID!) : Message
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
    likeCounter: String,
    dislikes: [Like],
    dislikeCounter: String,
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

  type Message {
    message: String
  }
  
`;