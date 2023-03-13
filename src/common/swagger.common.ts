import { ApiResponseOptions } from '@nestjs/swagger';
import { BadRequestException } from '../exceptions/bad-request.exception';

/**
 * Returns the data wrapped by an object with data key.
 */
export const toSwaggerError = (exception: BadRequestException, options?: ApiResponseOptions) => {
  return {
    content: { 'application/json': { example: exception.generateHttpResponseBody() } },
    ...options,
  };
};
