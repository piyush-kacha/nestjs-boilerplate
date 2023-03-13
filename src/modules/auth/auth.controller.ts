import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

import { BadRequestException } from '../../exceptions/bad-request.exception';
import { InternalServerErrorException } from '../../exceptions/internal-server-error.exception';
import { SignupRequestDTO } from './dtos/signup.dto';
import { UnauthorizedException } from '../../exceptions/unauthorized.exception';

@ApiBadRequestResponse({
  type: BadRequestException,
})
@ApiInternalServerErrorResponse({
  type: InternalServerErrorException,
})
@ApiUnauthorizedResponse({
  type: UnauthorizedException,
})
@Controller('auth')
export class AuthController {
  @Post('signup')
  async signup(@Body(ValidationPipe) signupRequestDTO: SignupRequestDTO) {
    return signupRequestDTO;
  }
}
