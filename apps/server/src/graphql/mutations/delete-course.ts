import { prisma } from '@/services/prisma';
import { GraphQLID, GraphQLNonNull } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';
import { CourseType } from '../types/course-type';

export const DeleteCourse = mutationWithClientMutationId({
  name: 'DeleteCourse',
  description: 'Delete a Course',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  outputFields: {
    Course: {
      type: CourseType,
      resolve: ({ deletedCourse }) => {
        return deletedCourse;
      },
    },
  },
  mutateAndGetPayload: async ({ id }) => {
    const deletedCourse = await prisma.course.delete({
      where: { id: fromGlobalId(id).id },
    });

    return {
      deletedCourse,
    };
  },
});
