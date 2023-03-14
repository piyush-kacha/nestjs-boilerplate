import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class VerifyOTPRequestDTO {
  @ApiProperty({
    example: 123456,
    description: 'OTP which was sent to the user',
  })
  @IsNotEmpty()
  @IsNumber()
  otp: number;
}
