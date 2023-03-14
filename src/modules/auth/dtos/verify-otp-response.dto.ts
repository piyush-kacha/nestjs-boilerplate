import { ApiProperty } from '@nestjs/swagger';

export class VerifyOTPResponse {
  @ApiProperty({
    example: 'Your email has been verified successfully',
  })
  message: string;
}
