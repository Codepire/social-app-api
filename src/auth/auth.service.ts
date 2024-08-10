import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UserService) {}

    async validateUser(
        username: string,
        password: string,
    ): Promise<UserEntity | null> {
        const user = await this.usersService.findOne(username);
        console.log(user);
        if (user && user.password === password) {
            const { password, ...result } = user;
            password;
            return result as UserEntity;
        }
        return null;
    }
}
