import bcrypt from 'bcrypt';
import Article from '../models/articleModel';
import articleSchema from '../schemas/articleSchema';
import {checkAuth, login} from '../utils/auth';
export default {
    Query: {
      article: async (parent, args, { req }) => {
          return await Article.findById(args.id);
      },
      getAllArticlesOf : async (parent, args, {req}) => {
        return await Article.find({author: args.id});
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
              article.author = user._id;
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
      },

      like: async (parent, args, {req}) => {
        try {
          const response = await checkAuth(req);
          const user = response.user;
          const info = response.info;
          if(user){
            const article = await Article.findById(args.articleID);
            if(article){
              const oldLike = await article.likes.find({auhtor: user._id});
              console.log(oldLike);
              article.likes.unshift({author : user._id});
              await article.save();
              return article;
            }
            else{
              throw new Error("No article");
            }
          }
          else{
            throw new Error(info);
          }
        } catch (error) {
          throw new Error(error);
        }
      }
    },
  };