import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IS_SKIP_AUTH_KEY } from 'src/common/decorators/skip-auth.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const isSkipAuth = this.reflector.getAllAndOverride<boolean>(
            IS_SKIP_AUTH_KEY,
            [context.getHandler(), context.getClass()],
        );
        if (isSkipAuth) {
            return true;
        }
        return super.canActivate(context);
    }
}
