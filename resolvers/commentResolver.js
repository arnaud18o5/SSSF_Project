import Article from '../models/articleModel.js';
import {checkAuth, login} from '../utils/auth';

export default {
    Mutation: {
        postComment: async (parent, args, {req}) => {
            console.log("postComment");
            try {
                const response = await checkAuth(req);
                const author = response.user;
                const info = response.info;
                if(!author){
                    throw new Error(info);
                }
                else{
                    const article = await Article.findById(args.articleID);
                    console.log(author);
                    if(article){
                        article.comments.unshift({
                            author: author,
                            text: args.text,
                            date: new Date(),
                        })
                        console.log(article);
                        await article.save();
                        return article;
                    }
                }
            } catch (error) {
                console.log(error);
                throw new Error(error);
            }
        },
        removeComment: async (parent, args, {req}) => {
            try {
                const response = await checkAuth(req);
                const user = response.user;
                const info = response.info;
                if(!user){
                    throw new Error(info);
                }
                else{
                    const article = await Article.findById(args.articleID);
                    if(!article){
                        throw new Error("No article.");
                    }
                    else{
                        // args.commentID
                        const index = article.comments.findIndex(comment => comment._id.equals(args.commentID));
                        if(article.comments[index].author.equals(user._id)){
                            console.log(article.comments[index], "ok");
                            article.comments.splice(index, 1);
                        }
                        await article.save();
                        return article;
                    }
                }
            } catch (error) {
                throw new Error(error);
            }
        }

    }
}