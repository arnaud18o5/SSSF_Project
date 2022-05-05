import Article from '../models/articleModel';
import Topic from '../models/topicModel.js';
import User from '../models/userModel.js';
import {checkAuth, login} from '../utils/auth';

export default {
    Query: {
      article: async (parent, args, { req }) => {
          return await Article.findById(args.id);
      },
      getAllArticlesOf : async (parent, args, {req}) => {
        const articles = await Article.find({author: args.id});
        return articles;
      },
      getAllArticles : async (parent, args) => {
        const articles = await Article.find({});
        return articles;
      },

      getLastArticles : async (parent, args) => {
        const articles = await Article.find({});
        console.log(articles);
        articles.sort((a,b) => {
          if(a.date > b.date) return -1;
          if(a.date < b.date) return 1;
          return 0;
        });
        return articles.slice(0,args.number);
      },

      getBestArticles: async (parent, args) => {
        const articles = await Article.find({});
        console.log(articles);
        //articles.sort({"likeCounter":-1});
        articles.sort((a,b) => {
          if(a.likeCounter > b.likeCounter) return -1;
          if(a.likeCounter < b.likeCounter) return 1;
          return 0;
        })
        return articles.slice(0,args.number);
      },

      getArticleByTopic: async (parent, args) => {
        try {
          const articles = await Article.find({"topics": {$elemMatch: { _id : args.topicID}}});
          console.log(args.topicID);
          return articles;
        } catch (error) {
          throw new Error(error);
        }
      },
      
      getArticleById: async (parent, args) => {
        try {
          const article = await Article.findById(args.articleID);
          const author = await User.findById(article.author.id);
          console.log("young author",author);
          console.log("old author",article.author);
          if(JSON.stringify(author)!==JSON.stringify(article.author)){
            console.log("change")
            const art = await Article.updateOne({id: article.id}, {$set: {author:{ id: author._id, username: author.username, firstName: author.firstName, lastName: author.lastName, avatar: author.avatar, description: author.description}}});
            console.log(art);
          }
          const a = await Article.findById(article.id);
          console.log(a);
          return a;
        } catch (error) {
          throw new Error(error);
        }
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
              article.likeCounter = '0';
              article.dislikeCounter = '0';
              const t = args.topics;
              if(t){
                await Promise.all(t.map( async topic => {
                  const to = await Topic.findById(topic);
                  if(to!==null){
                    article.topics.push(to);
                  }
                }));
              }
              const newArticle = new Article(article);
              console.log(newArticle);
              const result = await newArticle.save();
              return newArticle;
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
                article.likeCounter = (parseInt(article.likeCounter) - 1).toString();
              }
              else{
                if(article.dislikes.find(like => user._id.equals(like.usr._id))) article.dislikeCounter = (parseInt(article.dislikeCounter) - 1).toString();
                article.dislikes = article.dislikes.filter(like => !(like.usr._id.equals(user._id)));
                article.likes.push({usr : {_id:user._id, username: user.username, firstName: user.firstName, lastName: user.lastName, avatar: user.avatar}});
                article.likeCounter = (parseInt(article.likeCounter) + 1).toString();
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
              if(article.dislikes.find(like => like.usr._id.equals(user._id))){
                article.dislikes = article.dislikes.filter(like => !(like.usr.id.equals(user._id)));
                article.dislikeCounter = (parseInt(article.dislikeCounter) - 1).toString();
              }
              else{
                if(article.likes.find(like => like.usr._id.equals(user._id))) article.likeCounter = (parseInt(article.likeCounter) - 1).toString();
                article.likes = article.dislikes.filter(like => !(like.usr._id.equals(user._id)));
                console.log(user);
                article.dislikes.push({usr :{_id:user._id, username: user.username, firstName: user.firstName, lastName: user.lastName, avatar: user.avatar}});
                article.dislikeCounter = (parseInt(article.dislikeCounter) + 1).toString();
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

      removeArticle: async (parent, args, {req}) => {
        try {
          const res = await checkAuth(req);
          const user=res.user;
          const info=res.info;
          if(user){
            const article = await Article.findById(args.articleID);
            if(article){
              console.log(article);
              if(article.author.id.equals(user._id)){
                await Article.deleteOne({"_id":args.articleID});
                return (
                  {"message":"Article deleted"}
                )
              }
              console.log(article.author.id, user._id);
              throw new Error("You can't delete article if it's not yours.");
            }
            else
              throw new Error("Can't find the article.");
          }
          else
            throw new Error("User not connected.");
        } catch (error) {
          throw new Error(error);
        }
      }
    },
  };