/**
 * A custom exception that represents a BadRequest error.
 */

// Import required modules
import { HttpException, HttpStatus } from '@nestjs/common';

// Import internal modules
import { ExceptionConstants } from './exceptions.constants';
import { IException } from './exceptions.interface';

export class BadRequestException extends HttpException {
  code: number; // Internal status code

  cause: Error; // Error object causing the exception

  description: string; // Description of the exception

  message: string; // Message for the exception

  /**
   * Constructs a new BadRequestException object.
   * @param exception An object containing the exception details.
   *  - message: A string representing the error message.
   *  - cause: An object representing the cause of the error.
   *  - description: A string describing the error in detail.
   *  - code: A number representing internal status code which helpful in future for frontend
   */
  constructor(exception: IException) {
    super(exception.message, HttpStatus.BAD_REQUEST, {
      cause: exception.cause,
      description: exception.description,
    });
    this.message = exception.message;
    this.cause = exception.cause;
    this.description = exception.description;
    this.code = exception.code;
  }

  /**
   * Returns a new instance of BadRequestException representing an HTTP Request Timeout error.
   * @returns An instance of BadRequestException representing the error.
   */
  static HTTP_REQUEST_TIMEOUT = () => {
    return new BadRequestException({
      message: 'HTTP Request Timeout',
      code: ExceptionConstants.BadRequestCodes.HTTP_REQUEST_TIMEOUT,
    });
  };

  /**
   * Returns a new instance of BadRequestException representing a Validation Error.
   * @param msg A string representing the error message.
   * @returns An instance of BadRequestException representing the error.
   */
  static VALIDATION_ERROR = (msg?: string) => {
    return new BadRequestException({
      message: msg || 'Validation Error',
      code: ExceptionConstants.BadRequestCodes.VALIDATION_ERROR,
    });
  };

  /**
   * Returns a new instance of BadRequestException representing an Unexpected Error.
   * @param msg A string representing the error message.
   * @returns An instance of BadRequestException representing the error.
   */
  static UNEXPECTED = (msg?: string) => {
    return new BadRequestException({
      message: msg || 'Unexpected Error',
      code: ExceptionConstants.BadRequestCodes.UNEXPECTED_ERROR,
    });
  };
}
