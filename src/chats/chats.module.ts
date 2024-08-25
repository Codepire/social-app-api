import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsResolver } from './chats.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEntity } from './entities/chat.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ChatEntity, UserEntity])],
    providers: [ChatsResolver, ChatsService],
})
export class ChatsModule {}
