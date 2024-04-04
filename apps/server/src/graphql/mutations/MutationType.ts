import { GraphQLObjectType } from 'graphql';
import { CreateStudent } from './create-student';

export const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'MutationType',
  fields: () => ({
    createStudent: CreateStudent,
  }),
});
