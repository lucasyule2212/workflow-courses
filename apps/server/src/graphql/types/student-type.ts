import { Student } from '@prisma/client';
import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { NodeInterface } from '../NodeInterface';

export const StudentType: GraphQLObjectType<Student> = new GraphQLObjectType({
  name: 'Student',
  description: 'StudentType',
  fields: () => ({
    id: globalIdField('Student'),
    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ name }) => name,
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ email }) => email,
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ createdAt }) => createdAt,
    },
    updatedAt: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ updatedAt }) => updatedAt,
    },
  }),
  interfaces: () => [NodeInterface],
});
