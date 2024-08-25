import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entities/user.entity';
import { DataSource, DeleteResult, Repository } from 'typeorm';
import { RegisterUserInput } from './dtos/register-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { CONSTANTS } from 'src/common/constants';
import { Cryptography } from 'src/common/utils/cryptography';
import { ValidateOtpInput } from './dtos/validate-otp.input';
import { OtpEntity } from 'src/user/entities/otp.entity';
import { otp_types_enum } from 'src/common/enums';
import { ForgotPasswordInput } from './dtos/forgot-password.input';
import { ResetPasswordInput } from './dtos/reset-password.input';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly dataSource: DataSource,

        /* Custom services */
        private readonly cryptography: Cryptography,

        /* Repositories */
        @InjectRepository(UserEntity)
        private readonly usersRepo: Repository<UserEntity>,

        @InjectRepository(OtpEntity)
        private readonly otpsRepo: Repository<OtpEntity>,
    ) {}

    /**
     * @description validates a user by checking their username and password.
     * (used in local strategy callback)
     *
     * @param {string} username
     * @param {string} password
     * @returns {Promise<UserEntity | null>}
     */
    async validateUser(
        username: string,
        password: string,
    ): Promise<UserEntity | null> {
        const user = await this.usersRepo.findOne({
            where: { username, deleted_at: null, verified: true },
        });
        if (
            user &&
            (await this.cryptography.compare({
                plainText: password,
                hash: user.password,
                salt: user.salt,
            }))
        ) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...result } = user;
            return result as UserEntity;
        }
        return null;
    }

    async login(user: UserEntity) {
        const payload = { username: user.username, sub: user.id };
        const access_token = await this.jwtService.signAsync(payload);
        return {
            access_token: `Bearer ${access_token}`,
        };
    }

    async register({
        registerUserInput,
        otp,
    }: {
        registerUserInput: RegisterUserInput;
        otp: string;
    }) {
        const foundUser = await this.usersRepo.findOne({
            where: [
                { username: registerUserInput.username },
                { email: registerUserInput.email },
            ],
        });

        if (foundUser) {
            return {
                message: CONSTANTS.USER_ALREADY_EXISTS_ERROR,
            };
        }

        const { hash, salt } = await this.cryptography.hash({
            plainText: registerUserInput.password,
        });
        const newUser = this.usersRepo.create({
            ...registerUserInput,
            password: hash,
            salt,
        });

        await this.usersRepo.save(newUser);
        await this.otpsRepo.save({
            user: newUser,
            otp,
            otp_type: otp_types_enum.SIGN_UP,
        });
    }

    async activateAccount(validateOtpInput: ValidateOtpInput): Promise<void> {
        const foundUser: UserEntity = await this.usersRepo.findOne({
            where: {
                id: validateOtpInput.user_id,
            },
        });
        if (!foundUser) {
            throw new Error(CONSTANTS.USER_NOT_EXIST);
        }
        await this.dataSource.manager.transaction(async (transaction) => {
            await transaction.delete(OtpEntity, {
                otp: validateOtpInput.otp,
                otp_type: otp_types_enum.SIGN_UP,
                user: foundUser,
            });
            await transaction.update(
                UserEntity,
                { id: foundUser.id },
                { verified: true },
            );
        });
    }

    async forgotPassword({
        forgotPasswordInput,
        otp,
    }: {
        forgotPasswordInput: ForgotPasswordInput;
        otp: string;
    }): Promise<void> {
        const foundUser: UserEntity = await this.usersRepo.findOne({
            where: {
                email: forgotPasswordInput.email,
                verified: true,
                deleted_at: null,
            },
        });

        if (!foundUser) {
            throw new Error(CONSTANTS.USER_NOT_EXIST);
        }

        await this.otpsRepo.save({
            otp,
            otp_type: otp_types_enum.FORGOT_PASSWORD,
            user: foundUser,
        });
    }

    async resetPassword(resetPasswordInput: ResetPasswordInput): Promise<void> {
        const foundUser: UserEntity = await this.usersRepo.findOneBy({
            email: resetPasswordInput.email,
        });

        if (!foundUser) {
            throw new Error(CONSTANTS.USER_NOT_EXIST);
        }

        const { hash, salt } = await this.cryptography.hash({
            plainText: resetPasswordInput.password,
        });

        await this.dataSource.transaction(async (transactionManager) => {
            const deleteResult: DeleteResult = await transactionManager.delete(
                OtpEntity,
                {
                    otp_type: otp_types_enum.FORGOT_PASSWORD,
                    otp: resetPasswordInput.otp,
                    user: foundUser,
                } as OtpEntity,
            );

            if (deleteResult.affected === 0) {
                throw new Error(CONSTANTS.OTP_VERIFICATION_FAILED);
            }

            await transactionManager.update(
                UserEntity,
                { email: resetPasswordInput.email } as UserEntity,
                { password: hash, salt: salt } as UserEntity,
            );
        });
    }
}
