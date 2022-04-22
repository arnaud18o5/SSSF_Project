import {gql} from 'apollo-server-express';

export default gql`
  scalar Upload
  extend type Query {
      uploads: [File]
  }
  
  extend type Mutation {
      singleUpload(file: Upload!): File!

  }
  
  type File {
    url: String!
  }
`;