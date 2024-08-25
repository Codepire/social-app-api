import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ChatsService } from './chats.service';
import { GenericResult } from 'src/common/generic.result';
import { CreateChatInput } from './dtos/create-chat.input';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { IUserPayload } from 'src/common/interfaces';

@Resolver()
export class ChatsResolver {
    constructor(private readonly chatsService: ChatsService) {}

    @Mutation(() => GenericResult)
    async createChat(
        @Args('object') createChatInput: CreateChatInput,
        @CurrentUser() currentUser: IUserPayload,
    ): Promise<GenericResult> {
        await this.chatsService.createChat(createChatInput, currentUser);
        return {
            message: 'Chat created successfully',
        };
    }
}
