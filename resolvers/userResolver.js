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
        console.log("user :", user);
        console.log("info :", info);
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
        console.log("login userresolver");
        req.body = args;
        const log = await login(req);
        return log
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
          const userWithHash = {
            ...user,
            password: hash,
          };
          const newUser = new User(userWithHash);
          const result = await newUser.save();
          return result;
        } catch (err) {
          throw new Error(err);
        }
      },
      addUserInfo : async (parent, args, {req}) => {
        try {
          console.log("addUserInfo userResolver");
          const user = await checkAuth(req);
          const u = await User.update({id: args.id}, {$set:{firstName: args.firstName, lastName: args.lastName, description: args.description}});
          const updatedUser = await User.findById(args.id);
          return updatedUser;
        } catch (error) {
          throw new Error(err);
        }
      }
    },
  };