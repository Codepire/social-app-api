import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';

@Resolver()
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(() => UserEntity)
    async findUser(@Args('username') username: string) {
        return await this.userService.findOne(username);
    }
}
