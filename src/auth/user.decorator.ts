import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '../users/entities/user.entity';

export const CurrentUser = createParamDecorator(
  (data, ctx: ExecutionContext): UserEntity => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
