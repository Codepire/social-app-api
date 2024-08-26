import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropTableChatsUsersUsers1724688167735
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE chats_users_users`);
    }

    public async down(): Promise<void> {}
}
