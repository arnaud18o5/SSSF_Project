'use strict';
import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import bodyParser from 'body-parser';
import typeDefs from './schemas/index';
import resolvers from './resolvers/index';
import dotenv from 'dotenv';
dotenv.config();
import connectMongo from './utils/db';
import { checkAuth } from './utils/auth';

(async () => {
    try {
        const conn = await connectMongo();
        if (conn) {
          console.log('Connected successfully.');
        } else {
          throw new Error('db not connected');
        }
    
        const server = new ApolloServer({
          typeDefs,
          resolvers,
          context:  async ( {req} ) => {
            if (req) {
              const user = await checkAuth(req);
              return { user, req };
            }
          },
        });
    
        const app = express();
    
        app.use(bodyParser.urlencoded({ extended: false }))
        await server.start();
    
        server.applyMiddleware({ app });
    
        app.listen({ port: process.env.PORT || 3000 }, () =>
          console.log(
            `🚀 Server ready at http://localhost:3000${server.graphqlPath}`
          )
        );
      } catch (e) {
        console.log('server error: ' + e.message);
      }
})();