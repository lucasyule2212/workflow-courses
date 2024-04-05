import { prisma } from '@/services/prisma';
import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';
import slugify from 'slugify';
import { CourseType } from '../types/course-type';

export const UpdateCourse = mutationWithClientMutationId({
  name: 'UpdateCourse',
  description: 'Update a course',
  inputFields: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    courseId: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  outputFields: {
    course: {
      type: CourseType,
      resolve: ({ courseId }) => {
        const course = prisma.course.findUnique({
          where: { id: courseId },
        });

        return course;
      },
    },
  },
  mutateAndGetPayload: async ({ title, courseId }) => {
    const updatedSlug = slugify(title, { lower: true });

    const updatedCourse = await prisma.course.update({
      where: { id: fromGlobalId(courseId).id },
      data: { title, slug: updatedSlug },
    });

    return {
      courseId: updatedCourse.id,
    };
  },
});
