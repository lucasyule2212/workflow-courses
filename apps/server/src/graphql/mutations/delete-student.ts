import { prisma } from '@/services/prisma';
import { GraphQLID, GraphQLNonNull } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';
import { StudentType } from '../types/student-type';

export const DeleteStudent = mutationWithClientMutationId({
  name: 'DeleteStudent',
  description: 'Delete a student',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  outputFields: {
    student: {
      type: StudentType,
      resolve: ({ deletedStudent }) => {
        return deletedStudent;
      },
    },
  },
  mutateAndGetPayload: async ({ id }) => {
    const deletedStudent = await prisma.student.delete({
      where: { id: fromGlobalId(id).id },
    });

    return {
      deletedStudent,
    };
  },
});
