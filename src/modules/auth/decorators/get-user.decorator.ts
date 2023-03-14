import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { UserDocument } from '../../user/user.schema';

export const GetUser = createParamDecorator((data: unknown, ctx: ExecutionContext): UserDocument => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
