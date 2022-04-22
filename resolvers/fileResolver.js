import bcrypt from 'bcrypt';
import File from '../models/fileModel';
import {checkAuth, login} from '../utils/auth';
import {GraphQLUpload} from 'graphql-upload';
import path from 'path';
import fs  from 'fs';

export default {
    Upload: GraphQLUpload,

    Mutation: {
        singleUpload: async (parent, { file }) => {
          const { createReadStream, filename, mimetype, encoding } = await file;
          const stream = createReadStream();
          const pathName = path.join(__dirname, `../public/images/${filename}`);
          await stream.pipe(fs.createWriteStream(pathName));
          return {
            url: `http://localhost:4000/images/${filename}`
          };
        },
    }
  };