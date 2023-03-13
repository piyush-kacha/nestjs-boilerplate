import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignupRequestDTO } from './dtos/signup-request.dto';
import { SignupResponse } from './dtos/signup-response.dto';

import { BadRequestException } from '../../exceptions/bad-request.exception';
import { InternalServerErrorException } from '../../exceptions/internal-server-error.exception';
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
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({
    type: SignupResponse,
  })
  @Post('signup')
  async signup(@Body(ValidationPipe) signupRequestDTO: SignupRequestDTO): Promise<SignupResponse> {
    return this.authService.signup(signupRequestDTO);
  }
}
