import { GraphQLObjectType } from 'graphql';
import { CreateCourse } from './create-course';
import { CreateStudent } from './create-student';

export const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'MutationType',
  fields: () => ({
    createStudent: CreateStudent,
    createCourse: CreateCourse,
  }),
});
