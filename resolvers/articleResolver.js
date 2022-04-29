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
      },
      getLastArticles : async (parent, args) => {
        const articles = await Article.find({}).sort({"date": 1});
        return articles.slice(0,args.number);
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
              article.author = {id: user._id, username: user.username, firstName: user.firstName, lastName: user.lastName, description: user.description, avatar:user.avatar};
              article.headPicture = args.headPicture;
              article.date = (new Date()).toISOString();
              article.topics = [];
              const t = args.topics;
              await Promise.all(t.map( async topic => {
                const to = await Topic.findById(topic);
                if(to!==null){
                  article.topics.push(to);
                }
              }));
              const newArticle = new Article(article);
              console.log(newArticle);
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
                if(article.likes.find(like => user._id.equals(like.usr._id))){
                article.likes = article.likes.filter(like => !(like.usr._id.equals(user._id)));
              }
              else{
                article.dislikes = article.dislikes.filter(like => !(like.usr._id.equals(user._id)));
                article.likes.push({usr : {_id:user._id, username: user.username, firstName: user.firstName, lastName: user.lastName, avatar: user.avatar}});
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