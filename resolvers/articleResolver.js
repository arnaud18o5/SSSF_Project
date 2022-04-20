import bcrypt from 'bcrypt';
import Article from '../models/articleModel';
import {checkAuth, login} from '../utils/auth';
export default {
    Query: {
      article: async (parent, args, { req }) => {
          return await Article.findById(args.id);
      }
    },
    Mutation: {
      postArticle: async (parent, args, {req}) => {
        try {
          console.log("postArticle articleResolver");
          const response = await checkAuth(req)
          const user = response.user;
          const info = response.info;
          if(user){
              let article = args;
              article.author = user.username;
              article.date = new Date();
              const newArticle = new Article(article);
              console.log("new article", newArticle)
              const result = await newArticle.save();
              return result;
          }
          else{
            throw new Error(info);
          }
        } catch (err) {
          throw new Error(err);
        }
      }
    },
  };