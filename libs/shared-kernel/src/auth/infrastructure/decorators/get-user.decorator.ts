import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

/**
 * GQL decorator for get auth user
 */
export const GetGqlAuthUser = createParamDecorator(
  (_, ctx: ExecutionContext): any =>
    GqlExecutionContext.create(ctx).getContext().req.user
);

/**
 * Rest decorator for get auth user
 */
export const GetRestAuthUser = createParamDecorator(
  (_, ctx: ExecutionContext): any => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);
