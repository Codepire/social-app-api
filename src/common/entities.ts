import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class TimeStampedCommonEntities {
    @CreateDateColumn({ type: 'timestamp' })
    created_at?: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at?: string;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deleted_at?: string | null;
}
