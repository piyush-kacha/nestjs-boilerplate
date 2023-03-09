import { HttpException, HttpStatus } from '@nestjs/common';

// Import internal files & modules
import { ExceptionConstants } from './exceptions.constants';
import { IException } from './exceptions.interface';

// Exception class for Internal Server Error
export class InternalServerErrorException extends HttpException {
  code: number; // Internal status code

  cause: Error; // Error object causing the exception

  description: string; // Description of the exception

  message: string; // Message for the exception

  /**
   * Constructs a new InternalServerErrorException object.
   * @param exception An object containing the exception details.
   *  - message: A string representing the error message.
   *  - cause: An object representing the cause of the error.
   *  - description: A string describing the error in detail.
   *  - code: A number representing internal status code which helpful in future for frontend
   */
  constructor(exception: IException) {
    super(exception.message, HttpStatus.INTERNAL_SERVER_ERROR, {
      cause: exception.cause,
      description: exception.description,
    });
    this.message = exception.message;
    this.cause = exception.cause;
    this.description = exception.description;
    this.code = exception.code;
  }

  /**
   * Returns a new instance of InternalServerErrorException with a standard error message and code
   * @param error Error object causing the exception
   * @returns A new instance of InternalServerErrorException
   */
  static INTERNAL_SERVER_ERROR = (error: any) => {
    return new InternalServerErrorException({
      message: 'We are sorry, something went wrong on our end. Please try again later or contact our support team for assistance.',
      code: ExceptionConstants.InternalServerErrorCodes.INTERNAL_SERVER_ERROR,
      cause: error,
    });
  };

  /**
   * Returns a new instance of InternalServerErrorException with a custom error message and code
   * @param error Error object causing the exception
   * @returns A new instance of InternalServerErrorException
   */
  static UNEXPECTED_ERROR = (error: any) => {
    return new InternalServerErrorException({
      message: 'An unexpected error occurred while processing the request.',
      code: ExceptionConstants.InternalServerErrorCodes.UNEXPECTED_ERROR,
      cause: error,
    });
  };
}
