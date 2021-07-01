import { ApolloError } from 'apollo-server-errors';
import { GraphQLErrorCode } from './graphql.errorcodes.exception';

class APIError extends ApolloError {
  constructor(message: string);

  constructor(message: string, code: GraphQLErrorCode);

  constructor(
    message: string,
    code: GraphQLErrorCode = GraphQLErrorCode.INTERNAL_SERVER_ERROR,
  ) {
    super(message, code);
  }
}

export { APIError };
