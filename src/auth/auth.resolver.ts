import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UserEntity } from 'src/user/entity/user.entity';
import { LoginUserInput } from './dtos/login-user.input';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginUserOutput } from './dtos/login-user.output';
import { SkipAuth } from 'src/common/decorators/skip-auth.decorator';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @SkipAuth()
    @UseGuards(LocalAuthGuard)
    @Query(() => LoginUserOutput)
    async login(
        @CurrentUser() user: UserEntity,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        @Args('object') _: LoginUserInput,
    ) {
        return await this.authService.login(user);
    }
}
