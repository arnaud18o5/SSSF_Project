import bcrypt from 'bcrypt';
import User from '../models/userModel';
import {checkAuth, login} from '../utils/auth';
export default {
    Query: {
      user: async (parent, args, { req }) => {
        // find user by id
        const response = await checkAuth(req)
        const user = response.user;
        const info = response.info;
        if(user){
          return await User.findById(args.id);
        }
        else{
          throw new Error(info);
        }
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
            const u = await User.updateMany({username: user.username}, {$set:{firstName: args.firstName, lastName: args.lastName, description: args.description}});
            const updatedUser = await User.findById(user.id);
            return updatedUser;
          }
          else {
            throw new Error('Error: wrong token');
          }
        } catch (error) {
          throw new Error(error);
        }
      }
    },
  };