import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { RegisterUserInput } from './dtos/register-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { CONSTANTS } from 'src/common/constants';
import { Cryptography } from 'src/common/utils/cryptography';
import { ValidateOtpInput } from './dtos/validate-otp.input';
import { OtpEntity } from 'src/user/entities/otp.entity';
import { otp_types_enum } from 'src/common/enums';

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

    async activateAccount(validateOtpInput: ValidateOtpInput) {
        try {
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
                    otp_type: validateOtpInput.otp_type,
                    user: foundUser,
                });
                await transaction.update(
                    UserEntity,
                    { id: foundUser.id },
                    { verified: true },
                );
            });
            return 'Account activated successfully';
        } catch (error) {
            throw error;
        }
    }
}
