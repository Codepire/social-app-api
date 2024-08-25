import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { LoginUserInput } from './dtos/login-user.input';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginUserOutput } from './dtos/login-user.output';
import { SkipAuth } from 'src/common/decorators/skip-auth.decorator';
import { RegisterUserInput } from './dtos/register-user.input';
import { GenericResult } from 'src/common/generic.result';
import { generateOTP } from 'src/common/utils/generate-otp';
import { ValidateOtpInput } from './dtos/validate-otp.input';
import { ForgotPasswordInput } from './dtos/forgot-password.input';
import { ResetPasswordInput } from './dtos/reset-password.input';
import { ChangePasswordInput } from './dtos/change-password.input';
import { IUserPayload } from 'src/common/interfaces';

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
        return this.authService.login(user);
    }

    @SkipAuth()
    @Mutation(() => GenericResult)
    async register(@Args('object') registerUserInput: RegisterUserInput) {
        const otp = await generateOTP();
        await this.authService.register({
            otp,
            registerUserInput,
        });
        // await this.mailService.sendMail({
        //     context: { otp },
        //     type: 'REGISTER_OTP',
        //     to: registerUserInput.email,
        // });
        return {
            message: 'registered successfully',
        };
    }

    @SkipAuth()
    @Mutation(() => String)
    async validateOtp(
        @Args('object') validateOtpInput: ValidateOtpInput,
    ): Promise<string> {
        await this.authService.activateAccount(validateOtpInput);
        return 'Account activated successfully';
    }

    @SkipAuth()
    @Mutation(() => String)
    async forgotPassword(
        @Args('object') forgotPasswordInput: ForgotPasswordInput,
    ): Promise<string> {
        const otp = await generateOTP();
        await this.authService.forgotPassword({ forgotPasswordInput, otp });
        // todo: send mail
        return 'Otp has been sent to your email.';
    }

    @SkipAuth()
    @Mutation(() => String)
    async resetPassword(
        @Args('object') resetPasswordInput: ResetPasswordInput,
    ): Promise<string> {
        await this.authService.resetPassword(resetPasswordInput);
        // todo: send mail about password has been reset.
        return 'Password reset successfully';
    }

    @Mutation(() => String)
    async changePassword(
        @Args('object') changePasswordInput: ChangePasswordInput,
        @CurrentUser() currentUser: IUserPayload,
    ): Promise<string> {
        await this.authService.changePassword(changePasswordInput, currentUser);
        return 'Password changed.';
    }
}
