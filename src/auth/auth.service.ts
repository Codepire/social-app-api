import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserInput } from './dtos/register-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { CONSTANTS } from 'src/common/constants';
import { Cryptography } from 'src/common/utils/cryptography';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,

        /* Custom services */
        private readonly cryptography: Cryptography,

        /* Repositories */
        @InjectRepository(UserEntity)
        private readonly usersRepo: Repository<UserEntity>,
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

    async register(registerUserInput: RegisterUserInput) {
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
        await this.usersRepo.insert({
            ...registerUserInput,
            password: hash,
            salt,
        });
    }
}
