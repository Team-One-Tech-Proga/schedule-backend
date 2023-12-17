import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadDto } from './dto/jwt-payload.dto';

export const CurrentUser = createParamDecorator(
  (data, ctx: ExecutionContext): JwtPayloadDto => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
