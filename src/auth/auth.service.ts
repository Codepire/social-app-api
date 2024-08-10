import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserInput } from './dtos/register-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { CONSTANTS } from 'src/common/constants';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,

        @InjectRepository(UserEntity)
        private readonly usersRepo: Repository<UserEntity>,
    ) {}

    async validateUser(
        username: string,
        password: string,
    ): Promise<UserEntity | null> {
        const user = await this.usersRepo.findOne({
            where: { username, deleted_at: null, verified: true },
        });
        if (user && user.password === password) {
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

        await this.usersRepo.insert(registerUserInput);
        return {
            message: 'registered successfully',
        };
    }
}
