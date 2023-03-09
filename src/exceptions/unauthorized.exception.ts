import { HttpException, HttpStatus } from '@nestjs/common';

import { ExceptionConstants } from './exceptions.constants';
import { IException } from './exceptions.interface';

/**
 * A custom exception for unauthorized access errors.
 */
export class UnauthorizedException extends HttpException {
  /** The error code. */
  code: number;

  /** The error that caused this exception. */
  cause: Error;

  /** The detailed description of the error. */
  description: string;

  /** The error message. */
  message: string;

  /**
   * Constructs a new UnauthorizedException object.
   * @param exception An object containing the exception details.
   *  - message: A string representing the error message.
   *  - cause: An object representing the cause of the error.
   *  - description: A string describing the error in detail.
   *  - code: A number representing internal status code which helpful in future for frontend
   */
  constructor(exception: IException) {
    super(exception.message, HttpStatus.UNAUTHORIZED, {
      cause: exception.cause,
      description: exception.description,
    });

    this.message = exception.message;
    this.cause = exception.cause;
    this.description = exception.description;
    this.code = exception.code;
  }

  /**
   * A static method to generate an exception for token expiration error.
   * @param msg - An optional error message.
   * @returns An instance of the UnauthorizedException class.
   */
  static TOKEN_EXPIRED_ERROR = (msg?: string) => {
    return new UnauthorizedException({
      message: msg || 'The authentication token provided has expired.',
      code: ExceptionConstants.UnauthorizedCodes.TOKEN_EXPIRED_ERROR,
    });
  };

  /**
   * A static method to generate an exception for invalid JSON web token.
   * @param msg - An optional error message.
   * @returns An instance of the UnauthorizedException class.
   */
  static JSON_WEB_TOKEN_ERROR = (msg?: string) => {
    return new UnauthorizedException({
      message: msg || 'Invalid token specified.',
      code: ExceptionConstants.UnauthorizedCodes.JSON_WEB_TOKEN_ERROR,
    });
  };

  /**
   * A static method to generate an exception for unauthorized access to a resource.
   * @param description - An optional detailed description of the error.
   * @returns An instance of the UnauthorizedException class.
   */
  static UNAUTHORIZED_ACCESS = (description?: string) => {
    return new UnauthorizedException({
      message: 'Access to the requested resource is unauthorized.',
      code: ExceptionConstants.UnauthorizedCodes.UNAUTHORIZED_ACCESS,
      description,
    });
  };

  /**
   * A static method to generate an exception for unexpected errors.
   * @param error - The error that caused this exception.
   * @returns An instance of the UnauthorizedException class.
   */
  static UNEXPECTED_ERROR = (error: any) => {
    return new UnauthorizedException({
      message: 'An unexpected error occurred while processing the request. Please try again later.',
      code: ExceptionConstants.UnauthorizedCodes.UNEXPECTED_ERROR,
      cause: error,
    });
  };
}
