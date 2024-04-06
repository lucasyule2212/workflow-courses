import { prisma } from '@/services/prisma';
import { GraphQLID, GraphQLNonNull } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';
import { EnrollmentType } from '../types/enrollment-type';

export const InactivateEnrollment = mutationWithClientMutationId({
  name: 'InactivateEnrollment',
  description: 'Inactivate an Enrollment',
  inputFields: {
    enrollmentId: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  outputFields: {
    Enrollment: {
      type: EnrollmentType,
      resolve: ({ enrollmentId }) => {
        const inactivatedEnrollment = prisma.enrollment.findUnique({
          where: { id: enrollmentId },
        });

        return inactivatedEnrollment;
      },
    },
  },
  mutateAndGetPayload: async ({ enrollmentId }) => {
    const enrollment = await prisma.enrollment.findUnique({
      where: { id: fromGlobalId(enrollmentId).id },
    });

    if (!enrollment) {
      throw new Error('Enrollment not found');
    }

    if (enrollment.cancelledAt) {
      throw new Error('Enrollment is already inactivated');
    }

    const inactivatedEnrollment = await prisma.enrollment.update({
      where: { id: fromGlobalId(enrollmentId).id },
      data: {
        cancelledAt: new Date(),
      },
    });

    return {
      enrollmentId: inactivatedEnrollment.id,
    };
  },
});
