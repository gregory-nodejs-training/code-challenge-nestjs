import { APIError } from './apierror.exception';
import { GraphQLErrorCode } from './graphql.errorcodes.exception';

class ValidationError extends APIError {
  constructor(message: string) {
    super(message, GraphQLErrorCode.VALIDATION_ERROR);
  }
}

export { ValidationError };
