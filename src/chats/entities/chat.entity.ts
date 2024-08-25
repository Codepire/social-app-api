import { TimeStampedCommonEntities } from 'src/common/entities';
import { chat_types_enum } from 'src/common/enums';
import { UserEntity } from 'src/user/entities/user.entity';
import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'chats' })
export class ChatEntity extends TimeStampedCommonEntities {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    name?: string;

    @Column({ nullable: true })
    profile_url?: string;

    @Column({ nullable: true })
    bio?: string;

    @Column({
        type: 'enum',
        enum: chat_types_enum,
        default: chat_types_enum.DIRECT_MESSAGE,
    })
    type: chat_types_enum;

    /* Relations */
    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'created_by' })
    created_by: UserEntity;

    @ManyToMany(() => UserEntity, (user) => user.chats)
    @JoinTable({
        joinColumn: { name: 'chat_id' },
        inverseJoinColumn: { name: 'user_id' },
    })
    users: UserEntity[];
}
