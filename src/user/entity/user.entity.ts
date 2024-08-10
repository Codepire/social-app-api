import { TimeStampedCommonEntities } from 'src/common/entities';
import { gender_enum } from 'src/common/enums';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity extends TimeStampedCommonEntities {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 30, unique: true })
    username: string;

    @Column({ type: 'varchar', length: 30, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 300 })
    password: string;

    @Column({ type: 'varchar', length: 150 })
    bio: string;
    @Column({ type: 'varchar', length: 200, unique: true, default: 'Some url' })
    profile_url: string;

    @Column({ type: 'enum', enum: gender_enum, default: gender_enum.MALE })
    gender: gender_enum;

    @Column({ type: 'varchar', length: 10 })
    mobile_no: string;
}
