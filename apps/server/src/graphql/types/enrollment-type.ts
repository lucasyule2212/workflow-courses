import { NodeInterface } from '@/graphql/NodeInterface';
import { Enrollment } from '@prisma/client';
import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { connectionDefinitions, globalIdField } from 'graphql-relay';
import { CourseType } from './course-type';
import { StudentType } from './student-type';

export const EnrollmentType: GraphQLObjectType<Enrollment> =
  new GraphQLObjectType({
    name: 'Enrollment',
    fields: () => ({
      id: globalIdField('Enrollment'),
      student: {
        type: new GraphQLNonNull(StudentType),
        resolve: (enrollment) => enrollment.student,
      },
      course: {
        type: new GraphQLNonNull(CourseType),
        resolve: (enrollment) => enrollment.course,
      },
      createdAt: {
        type: new GraphQLNonNull(GraphQLString),
        resolve: (enrollment) => enrollment.createdAt.toISOString(),
      },
      updatedAt: {
        type: new GraphQLNonNull(GraphQLString),
        resolve: (enrollment) => enrollment.updatedAt.toISOString(),
      },
      cancelledAt: {
        type: GraphQLString,
        resolve: (enrollment) => enrollment.cancelledAt?.toISOString(),
      },
    }),
    interfaces: () => [NodeInterface],
  });

export const { connectionType: EnrollmentConnection } = connectionDefinitions({
  name: 'Enrollment',
  nodeType: EnrollmentType,
});
