import { prisma } from '@/services/prisma';
import { fromGlobalId, nodeDefinitions } from 'graphql-relay';
import { StudentType } from './types/student-type';

const { nodeField, nodesField, nodeInterface } = nodeDefinitions(
  async (globalId: string) => {
    // This is a particularity of the Relay GraphQL server implementation
    const { id, type } = fromGlobalId(globalId);

    if (type === 'Student') {
      const node = await prisma.student.findUnique({
        where: {
          id,
        },
      });

      return node;
    }

    return null;
  },
  (obj) => {
    if ('email' in obj) return StudentType;
    return null;
  },
);

export const NodeInterface = nodeInterface;
export const NodeField = nodeField;
export const NodesField = nodesField;
