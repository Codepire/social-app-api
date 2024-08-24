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
import { otp_types_enum } from 'src/common/enums';

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
    async validateOtp(@Args('object') validateOtpInput: ValidateOtpInput) {
        if (validateOtpInput.otp_type === otp_types_enum.SIGN_UP) {
            return await this.authService.activateAccount(validateOtpInput);
        }
    }
}
