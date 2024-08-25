import { Field, ObjectType } from '@nestjs/graphql';
import { TimeStampedCommonEntities } from 'src/common/entities';
import { gender_enum } from 'src/common/enums';
import {
    Column,
    Entity,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { OtpEntity } from './otp.entity';
import { ChatEntity } from 'src/chats/entities/chat.entity';

@ObjectType('user')
@Entity({ name: 'users' })
export class UserEntity extends TimeStampedCommonEntities {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Field()
    @Column({ type: 'varchar', length: 30, unique: true })
    username: string;

    @Field()
    @Column({ type: 'varchar', length: 30, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 300 })
    password: string;

    @Column({ type: 'varchar', length: 40, nullable: true })
    salt: string;

    @Field({ nullable: true })
    @Column({ type: 'varchar', length: 150, nullable: true })
    bio?: string;

    @Field({ nullable: true })
    @Column({ type: 'varchar', length: 200, unique: true, nullable: true })
    profile_url?: string;

    @Field({ nullable: true })
    @Column({ type: 'enum', enum: gender_enum, default: gender_enum.MALE })
    gender?: gender_enum;

    @Field()
    @Column({ type: 'varchar', length: 10 })
    mobile_no: string;

    @Column({ type: 'boolean', default: false })
    verified?: boolean;

    /* Relations */
    @OneToMany(() => OtpEntity, (otpEntity) => otpEntity.user, {
        onDelete: 'CASCADE',
    })
    otps?: OtpEntity;

    @ManyToMany(() => ChatEntity, (chat) => chat.users)
    chats: ChatEntity[];
}
