import { prisma } from '@/services/prisma';
import { GraphQLID, GraphQLNonNull } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';
import { ObjectId } from 'mongodb';
import { EnrollmentType } from '../types/enrollment-type';

export const CreateEnrollment = mutationWithClientMutationId({
  name: 'CreateEnrollment',
  description: 'Create a new Enrollment',
  inputFields: {
    studentId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    courseId: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  outputFields: {
    Enrollment: {
      type: EnrollmentType,
      resolve: async ({ enrollmentId }) => {
        const enrollment = await prisma.enrollment.findUnique({
          where: { id: enrollmentId },
          select: {
            id: true,
            student: true,
            course: true,
            createdAt: true,
            updatedAt: true,
            cancelledAt: true,
          },
        });

        return enrollment;
      },
    },
  },
  mutateAndGetPayload: async ({ studentId, courseId }) => {
    const existingEnrollment = await prisma.enrollment.findFirst({
      where: {
        studentId: fromGlobalId(studentId).id,
        courseId: fromGlobalId(courseId).id,
        cancelledAt: null,
      },
    });

    if (existingEnrollment) {
      throw new Error('Student is already enrolled in this course');
    }

    const newEnrollment = await prisma.enrollment.create({
      data: {
        id: new ObjectId().toString(),
        studentId: fromGlobalId(studentId).id,
        courseId: fromGlobalId(courseId).id,
        cancelledAt: null,
      },
    });

    return {
      enrollmentId: newEnrollment.id,
    };
  },
});
