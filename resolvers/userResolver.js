import bcrypt from 'bcrypt';
import User from '../models/userModel';
import {checkAuth, login} from '../utils/auth';
export default {
    Query: {
      user: async (parent, args, { req }) => {
        // find user by id
          return await User.findById(args.id);
      },
      login: async (parent, args, {req}) => {
        // get username and password from query
        // and add to req.body for passport
        console.log('login');
        req.body = args;
        const log = await login(req);
        if(log === false){
          throw new Error("Wrong credentials");
        }
        else{
          return log;
        }
      },
    },
    Mutation: {
      registerUser: async (parent, args) => {
        try {
          console.log("registerUser userResolver");
          const hash = await bcrypt.hash(args.password, 12);
          let user = args;
          user.firstName = 'empty';
          user.lastName = 'empty';
          user.description = 'empty';
          user.avatar = 'IOfBmq4ZMcCE.webp';
          const userWithHash = {
            ...user,
            password: hash,
          };
          const newUser = new User(userWithHash);
          const result = await newUser.save();
          console.log(result);
          return result;
        } catch (err) {
          throw new Error(err);
        }
      },

      addUserInfo : async (parent, args, {req}) => {
        try {
          console.log("addUserInfo userResolver");
          const response = await checkAuth(req);
          const user = response.user;
          const info = response.info;
          if(user){
            console.log(user.id);
            const u = await User.updateMany({username: user.username}, {$set:{firstName: args.firstName, lastName: args.lastName, description: args.description, avatar: args.avatar}});
            const updatedUser = await User.findById(user.id);
            return updatedUser;
          }
          else {
            throw new Error('Error: wrong token');
          }
        } catch (error) {
          throw new Error(error);
        }
      },

      subscribeToUser: async (parent, args, {req}) => {
        try {
          const response = await checkAuth(req);
          const subscriber = response.user;
          const info = response.info;

          if(!subscriber){
            throw new Error(info);
          }
          else{
            const subscribed = await User.findById(args.userID);
            if(subscribed.subscribers.find(sub => sub.id.equals(subscriber._id))){ // check if subscriber is already subscribed to subscribed user
              subscribed.subscribers = subscribed.subscribers.filter(sub => !(sub.id.equals(subscriber._id)));
              subscriber.subscribingTo = subscriber.subscribingTo.filter(sub => !(sub.id.equals(subscribed._id)));
            }
            else{
              subscribed.subscribers.push({id: subscriber._id, username: subscriber.username});
              subscriber.subscribingTo.push({id: subscribed._id, username: subscribed.username});
            }
            subscribed.save();
            subscriber.save();
            return subscribed;
          }
        } catch (error) {
          throw new Error(error);
        }
      }
    },
  };