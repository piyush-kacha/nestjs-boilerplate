import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/user.schema';

export class LoginResponse {
  @ApiProperty({
    description: 'The access token',
  })
  accessToken: string;

  @ApiProperty()
  user: User;
}
