import { Injectable } from '@nestjs/common';
import { CreateChatInput } from './dtos/create-chat.input';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatEntity } from './entities/chat.entity';
import { Repository } from 'typeorm';
import { IUserPayload } from 'src/common/interfaces';
import { UserEntity } from 'src/user/entities/user.entity';
import { CONSTANTS } from 'src/common/constants';

@Injectable()
export class ChatsService {
    constructor(
        /* Repositories */
        @InjectRepository(ChatEntity)
        private readonly chatsRepo: Repository<ChatEntity>,

        @InjectRepository(UserEntity)
        private readonly usersRepo: Repository<UserEntity>,
    ) {}

    async createChat(
        createChatInput: CreateChatInput,
        currentUser: IUserPayload,
    ) {
        const foundUser: UserEntity = await this.usersRepo.findOneBy({
            id: currentUser.userId,
            verified: true,
            deleted_at: null,
        });

        if (!foundUser) {
            throw new Error(CONSTANTS.USER_NOT_EXIST);
        }

        await this.chatsRepo.insert({
            ...createChatInput,
            created_by: foundUser,
        });
    }
}
