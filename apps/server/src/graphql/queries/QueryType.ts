import { prisma } from '@/services/prisma';
import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import { fromGlobalId } from 'graphql-relay';
import { NodeField, NodesField } from '../NodeInterface';
import { CourseType } from '../types/course-type';
import { EnrollmentType } from '../types/enrollment-type';
import { StudentType } from '../types/student-type';

export const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'QueryType',
  fields: () => ({
    node: NodeField,
    nodes: NodesField,
    student: {
      type: StudentType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: async (_, args) => {
        const student = await prisma.student.findUnique({
          where: { id: fromGlobalId(args.id).id },
        });
        return student;
      },
    },
    students: {
      type: new GraphQLList(StudentType),
      resolve: async () => {
        const students = await prisma.student.findMany();
        return students;
      },
    },
    course: {
      type: CourseType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: async (_, args) => {
        const course = await prisma.course.findUnique({
          where: { id: fromGlobalId(args.id).id },
        });
        return course;
      },
    },
    courses: {
      type: new GraphQLList(CourseType),
      resolve: async () => {
        const courses = await prisma.course.findMany();
        return courses;
      },
    },
    enrollments: {
      type: new GraphQLList(EnrollmentType),
      resolve: async () => {
        const enrollments = await prisma.enrollment.findMany({
          orderBy: { createdAt: 'desc' },
          include: {
            course: true,
            student: true,
          },
        });
        return enrollments;
      },
    },
    activeEnrollments: {
      type: new GraphQLList(EnrollmentType),
      resolve: async () => {
        const enrollments = await prisma.enrollment.findMany({
          where: { cancelledAt: null },
          orderBy: { createdAt: 'desc' },
          include: {
            course: true,
            student: true,
          },
        });
        return enrollments;
      },
    },
    inactivatedEnrollments: {
      type: new GraphQLList(EnrollmentType),
      resolve: async () => {
        const enrollments = await prisma.enrollment.findMany({
          where: { cancelledAt: { not: null } },
          orderBy: { createdAt: 'desc' },
          include: {
            course: true,
            student: true,
          },
        });
        return enrollments;
      },
    },
  }),
});
