import bcrypt from 'bcrypt';
import File from '../models/fileModel';
import {checkAuth, login} from '../utils/auth';
import {GraphQLUpload} from 'graphql-upload';
import path from 'path';
import fs  from 'fs';


function generateRandomString(length) {
    var result = ''; 
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

export default {
    Upload: GraphQLUpload,

    Mutation: {
        singleUpload: async (parent, { file }) => {
          const { createReadStream, filename } = await file;
          const { ext } = path.parse(filename);
          const randomName = generateRandomString(12) + ext;
          const stream = createReadStream();
          const pathName = path.join(__dirname, `../public/images/${randomName}`);
          await stream.pipe(fs.createWriteStream(pathName));
          return {
            url: `http://localhost:4000/images/${randomName}`
          };
        },
    }
  };