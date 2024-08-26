import { TimeStampedCommonEntities } from 'src/common/entities';
import { chat_user_role_types_enum } from 'src/common/enums';
import { UserEntity } from 'src/user/entities/user.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { ChatEntity } from './chat.entity';

@Entity('chat_user_mapping')
export class ChatUserMapping extends TimeStampedCommonEntities {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => UserEntity, (userEntity) => userEntity.chat_user_mapping)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @ManyToOne(() => ChatEntity, (userEntity) => userEntity.chat_user_mapping)
    @JoinColumn({ name: 'chat_id' })
    chat: ChatEntity;

    @Column({
        type: 'enum',
        enum: chat_user_role_types_enum,
        default: chat_user_role_types_enum.MEMBER,
    })
    role: string;
}
