import {gql} from 'apollo-server-express';
import userSchema from './userSchema.js';
import articleSchema from './articleSchema.js';
import fileSchema from './fileSchema.js';
import topicSchema from './topicSchema.js';

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
    articleSchema,
    fileSchema,
    topicSchema
];