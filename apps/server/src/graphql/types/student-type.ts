import { NodeInterface } from '../NodeInterface';
import { Student } from '@prisma/client';
import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';

export const StudentType: GraphQLObjectType<Student> = new GraphQLObjectType({
  name: 'Student',
  description: 'StudentType',
  fields: () => ({
    id: globalIdField('Student'),
    name: {
      type: GraphQLNonNull(GraphQLString),
      resolve: ({ name }) => name,
    },
    email: {
      type: GraphQLNonNull(GraphQLString),
      resolve: ({ email }) => email,
    },
    createdAt: {
      type: GraphQLNonNull(GraphQLString),
      resolve: ({ createdAt }) => createdAt,
    },
    updatedAt: {
      type: GraphQLNonNull(GraphQLString),
      resolve: ({ updatedAt }) => updatedAt,
    },
  }),
  interfaces: () => [NodeInterface],
});
