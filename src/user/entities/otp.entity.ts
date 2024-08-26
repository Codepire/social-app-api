import { Field, ObjectType } from '@nestjs/graphql';
import { otp_types_enum } from 'src/common/enums';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@ObjectType('otp')
@Entity('otps')
export class OtpEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Field()
    @Column({ type: 'enum', enum: otp_types_enum })
    otp_type: otp_types_enum;

    @Field()
    @Column({ type: 'varchar', length: 6 })
    otp: string;

    @Field()
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    /* Relations */
    @Field(() => UserEntity)
    @ManyToOne(() => UserEntity, (user) => user.otps, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;
}
