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
                        console.log(index);
                        if(index === -1)
                            throw new Error("Can't find the comment.");
                        if(article.comments[index].author.username === user.username){
                            console.log(article.comments[index], "ok");
                            article.comments.splice(index, 1);
                            await article.save();
                            return article;
                        }
                        else{
                            throw new Error("You have to be the author of the comment to remove it.");
                        }
                    }
                }
            } catch (error) {
                throw error;
            }
        }

    }
}