import { GraphQLSchema } from 'graphql';
import { MutationType } from './mutations/MutationType';
import { QueryType } from './queries/QueryType';

const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});

export default schema;
