import { Course } from '@prisma/client';
import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { NodeInterface } from '../NodeInterface';

export const CourseType: GraphQLObjectType<Course> = new GraphQLObjectType({
  name: 'Course',
  description: 'CourseType',
  fields: () => ({
    id: globalIdField('Course'),
    title: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ title }) => title,
    },
    slug: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ slug }) => slug,
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
