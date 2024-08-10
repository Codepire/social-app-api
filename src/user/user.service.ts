import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService {
    constructor(private readonly dataSource: DataSource) {}

    async findOne(username: string): Promise<UserEntity | null> {
        const foundUser = await this.dataSource
            .getRepository(UserEntity)
            .findOne({ where: { username } });
        return foundUser;
    }
}
