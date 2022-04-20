import {gql} from 'apollo-server-express';
import userSchema from './userSchema.js';
import articleSchema from './articleSchema.js';

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

export default [
    linkSchema,
    userSchema,
    articleSchema
];