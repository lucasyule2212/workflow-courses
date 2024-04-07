import { prisma } from '@/services/prisma';
import { fromGlobalId, nodeDefinitions } from 'graphql-relay';

const { nodeField, nodesField, nodeInterface } = nodeDefinitions(
  async (globalId: string) => {
    // This is a particularity of the Relay GraphQL server implementation
    const { id, type } = fromGlobalId(globalId);

    switch (type) {
      case 'Student':
        return await prisma.student.findUnique({
          where: {
            id,
          },
        });
      case 'Course':
        return await prisma.course.findUnique({
          where: {
            id,
          },
        });
      case 'Enrollment':
        return await prisma.enrollment.findUnique({
          where: {
            id,
          },
        });

      default:
        break;
    }
  },
  (obj) => {
    if ('email' in obj) return 'Student';
    if ('slug' in obj) return 'Course';
    if ('cancelledAt' in obj) return 'Enrollment';
    return null;
  },
);

export const NodeInterface = nodeInterface;
export const NodeField = nodeField;
export const NodesField = nodesField;
