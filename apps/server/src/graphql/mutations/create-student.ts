import { prisma } from '@/services/prisma';
import { Student } from '@prisma/client';
import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { StudentType } from '../types/student-type';

export const CreateStudent = mutationWithClientMutationId<Student>({
  name: 'CreateStudent',
  description: 'Create a new student',
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ name, email }) => {
    const newStudent = { name, email };

    const createdStudent = await prisma.student.create({
      data: newStudent,
    });

    return {
      message: 'Success',
      data: createdStudent,
      error: null,
    };
  },
  outputFields: {
    message: {
      type: GraphQLString,
      resolve: ({ message }) => message,
    },
    data: {
      type: StudentType,
      resolve: ({ data }) => data,
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});
