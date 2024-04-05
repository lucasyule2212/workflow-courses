import { prisma } from '@/services/prisma';
import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { ObjectId } from 'mongodb';
import slugify from 'slugify';
import { CourseType } from '../types/course-type';

export const CreateCourse = mutationWithClientMutationId({
  name: 'CreateCourse',
  description: 'Create a new course',
  inputFields: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
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
  mutateAndGetPayload: async ({ title }) => {
    const slug = slugify(title, { lower: true });

    const newCourse = { id: new ObjectId().toString(), title, slug };

    const createdCourse = await prisma.course.create({
      data: newCourse,
    });

    return {
      courseId: createdCourse.id,
    };
  },
});
