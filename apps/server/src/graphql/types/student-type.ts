import { prisma } from '@/services/prisma';
import { Student } from '@prisma/client';
import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import {
  connectionArgs,
  connectionFromPromisedArray,
  globalIdField,
} from 'graphql-relay';
import { NodeInterface } from '../NodeInterface';
import { EnrollmentConnection } from './enrollment-type';

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
    enrollments: {
      type: EnrollmentConnection,
      args: connectionArgs,
      resolve: async (student, args) => {
        const enrollments = prisma.enrollment.findMany({
          where: { studentId: student.id },
          include: {
            course: true,
            student: true,
          },
        });

        return connectionFromPromisedArray(enrollments, args);
      },
    },
  }),
  interfaces: () => [NodeInterface],
});
