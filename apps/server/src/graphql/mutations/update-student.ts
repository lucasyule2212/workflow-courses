import { prisma } from '@/services/prisma';
import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';
import { StudentType } from '../types/student-type';

export const UpdateStudent = mutationWithClientMutationId({
  name: 'UpdateStudent',
  description: 'Update a Student',
  inputFields: {
    name: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
    studentId: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  outputFields: {
    Student: {
      type: StudentType,
      resolve: ({ studentId }) => {
        const Student = prisma.student.findUnique({
          where: { id: studentId },
        });

        return Student;
      },
    },
  },
  mutateAndGetPayload: async ({ name, email, studentId }) => {
    const updatedStudent = await prisma.student.update({
      where: { id: fromGlobalId(studentId).id },
      data: { name, email },
    });

    return {
      studentId: updatedStudent.id,
    };
  },
});
