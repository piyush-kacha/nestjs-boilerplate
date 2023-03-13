import { ApiBadRequestResponse } from '@nestjs/swagger';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

import { BadRequestException } from '../../exceptions/bad-request.exception';
import { SignupRequestDTO } from './dtos/signup.dto';

@ApiBadRequestResponse({
  type: BadRequestException,
})
@Controller('auth')
export class AuthController {
  @Post('signup')
  async signup(@Body(ValidationPipe) signupRequestDTO: SignupRequestDTO) {
    return signupRequestDTO;
  }
}
