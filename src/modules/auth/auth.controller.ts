import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginRequestDTO, LoginResponse, SignupRequestDTO, SignupResponse } from './dtos';

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

  @ApiOkResponse({
    type: LoginResponse,
  })
  @Post('login')
  async login(@Body(ValidationPipe) loginRequestDTO: LoginRequestDTO): Promise<LoginResponse> {
    return this.authService.login(loginRequestDTO);
  }
}
