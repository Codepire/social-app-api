import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(
        username: string,
        password: string,
    ): Promise<UserEntity | null> {
        const user = await this.usersService.findOne(username);
        if (user && user.password === password) {
            const { password, ...result } = user;
            password;
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
}
