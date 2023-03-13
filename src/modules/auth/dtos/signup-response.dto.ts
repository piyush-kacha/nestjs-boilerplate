import { ApiProperty } from '@nestjs/swagger';

export class SignupResponse {
  @ApiProperty({
    example: 'Please check your email for the verification code',
  })
  message: string;
}
