import { ApiBadRequestResponse, ApiBearerAuth, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Body, Controller, HttpCode, Post, UseGuards, ValidationPipe } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginRequestDTO, LoginResponse, SignupRequestDTO, SignupResponse, VerifyOTPRequestDTO, VerifyOTPResponse } from './dtos';

import { BadRequestException, InternalServerErrorException, UnauthorizedException } from '../../exceptions';
import { GetUser } from './decorators/get-user.decorator';
import { JwtUnverifiedUserAuthGuard } from './guards/jwt-unverified-user-auth.guard';
import { UserDocument } from '../user/user.schema';

@ApiBadRequestResponse({
  type: BadRequestException,
})
@ApiInternalServerErrorResponse({
  type: InternalServerErrorException,
})
@ApiUnauthorizedResponse({
  type: UnauthorizedException,
})
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({
    type: SignupResponse,
  })
  @HttpCode(200)
  @Post('signup')
  async signup(@Body(ValidationPipe) signupRequestDTO: SignupRequestDTO): Promise<SignupResponse> {
    return this.authService.signup(signupRequestDTO);
  }

  @ApiOkResponse({
    type: LoginResponse,
  })
  @HttpCode(200)
  @Post('login')
  async login(@Body(ValidationPipe) loginRequestDTO: LoginRequestDTO): Promise<LoginResponse> {
    return this.authService.login(loginRequestDTO);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: VerifyOTPResponse,
  })
  @Post('verify-otp')
  @HttpCode(200)
  @UseGuards(JwtUnverifiedUserAuthGuard)
  async verifyOTP(@Body(ValidationPipe) verifyOTPRequestDTO: VerifyOTPRequestDTO, @GetUser() user: UserDocument): Promise<VerifyOTPResponse> {
    return this.authService.verifyOTP(verifyOTPRequestDTO, user);
  }
}
