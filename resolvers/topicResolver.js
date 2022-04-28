import Topic from '../models/topicModel.js';
import {checkAuth} from '../utils/auth';

export default {
    Query: {
        getAllTopics: async (parent, args) => {
            try {
                return await Topic.find();
            } catch (error) {
                throw new Error(error);
            }
        }
    },

    Mutation: {
        createTopic: async (parent, args, {req}) => {
            try {
                console.log("createTopic");
                const response = await checkAuth(req);
                const user = response.user;
                const info = response.info;
                if(!user){
                    console.log(error);
                    throw new Error(info);
                }
                else{
                    const topic = await Topic.findOne({name: args.name});
                    if(topic){
                        return topic;
                    }
                    else {
                        const newTopic = new Topic({name: args.name});
                        const result = await newTopic.save();
                        return result;
                    }
                }
            } catch (error) {
                throw new Error(error);
            }
        }
    }
}