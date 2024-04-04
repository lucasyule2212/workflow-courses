import { prisma } from '@/services/prisma';
import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import { fromGlobalId } from 'graphql-relay';
import { NodeField, NodesField } from '../NodeInterface';
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
  }),
});
