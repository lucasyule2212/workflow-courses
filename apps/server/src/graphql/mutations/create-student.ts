import { prisma } from '@/services/prisma';
import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { ObjectId } from 'mongodb';
import { StudentType } from '../types/student-type';

export const CreateStudent = mutationWithClientMutationId({
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
  outputFields: {
    student: {
      type: StudentType,
      resolve: ({ studentId }) => {
        const student = prisma.student.findUnique({
          where: { id: studentId },
        });

        return student;
      },
    },
  },
  mutateAndGetPayload: async ({ name, email }) => {
    const newStudent = { id: new ObjectId().toString(), name, email };

    const createdStudent = await prisma.student.create({
      data: newStudent,
    });

    return {
      studentId: createdStudent.id,
    };
  },
});
