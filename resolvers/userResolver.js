import bcrypt from 'bcrypt';
import User from '../models/userModel';
import {checkAuth, login} from '../utils/auth';
export default {
    Query: {
      user: async (parent, args, { req }) => {
        // find user by id
        console.log(req.headers);
        const user = await checkAuth(req)
        return await User.findById(args.id);
      },
      login: async (parent, args, {req}) => {
        // get username and password from query
        // and add to req.body for passport
        console.log("login");
        req.body = args;
        const log = await login(req);
        return log
      },
    },
    Mutation: {
      registerUser: async (parent, args) => {
        try {
          const hash = await bcrypt.hash(args.password, 12);
          const userWithHash = {
            ...args,
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
          console.log("add user info");
          const user = await checkAuth(req);
          console.log(user);
          await User.updateOne({id: args.id}, {$set:{firstName:args.firstName}});
          return await User.findById(args.id);
        } catch (error) {
          throw new Error(err);
        }
      }
    },
  };