import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class SignupRequestDTO {
  @ApiProperty({ description: 'Email address of the user', example: 'john@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Full name of the user', example: 'John Doe' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Password for the user account. Must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, and one special character.',
    example: 'MySecurePassword!@#',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak',
  })
  password: string;

  @ApiProperty({ description: 'Name of the workspace where the user belongs to', example: 'ACME Corporation' })
  @IsNotEmpty()
  @IsString()
  workspace: string;
}
