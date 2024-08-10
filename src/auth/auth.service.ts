import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entity/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        private readonly dataSource: DataSource,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(
        username: string,
        password: string,
    ): Promise<UserEntity | null> {
        const user = await this.dataSource
            .getRepository(UserEntity)
            .findOne({ where: { username, deleted_at: null } });
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
