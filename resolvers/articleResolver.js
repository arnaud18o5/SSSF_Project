import Article from '../models/articleModel';
import Topic from '../models/topicModel.js';
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
              let article = {};
              article.title = args.title;
              article.text = args.text;
              article.author = user._id;
              article.date = new Date();
              article.topics = [];
              const t = args.topics;
              await Promise.all(t.map( async topic => {
                const to = await Topic.findById(topic);
                if(to!==null){
                  article.topics.push(to);
                }
              }));
              const newArticle = new Article(article);
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
              if(article.likes.find(like => like.author.equals(user._id))){
                article.likes = article.likes.filter(like => !(like.author.equals(user._id)));
              }
              else{
                article.dislikes = article.dislikes.filter(like => !(like.author.equals(user._id)));
                article.likes.push({author : user._id});
              }   
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
      },

      dislike: async (parent, args, {req}) => {
        try {
          const response = await checkAuth(req);
          const user = response.user;
          const info = response.info;
          if(user){
            const article = await Article.findById(args.articleID);
            if(article){
              if(article.dislikes.find(like => like.author.equals(user._id))){
                article.dislikes = article.dislikes.filter(like => !(like.author.equals(user._id)));
              }
              else{
                article.likes = article.dislikes.filter(like => !(like.author.equals(user._id)));
                article.dislikes.push({author : user._id});
              }   
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