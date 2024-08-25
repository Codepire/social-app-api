import { Resolver } from '@nestjs/graphql';
import { ChatsService } from './chats.service';

@Resolver()
export class ChatsResolver {
    constructor(private readonly chatsService: ChatsService) {}
}
