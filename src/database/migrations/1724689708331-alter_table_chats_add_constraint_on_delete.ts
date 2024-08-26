import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableChatsAddConstraintOnDelete1724689708331
    implements MigrationInterface
{
    name = 'AlterTableChatsAddConstraintOnDelete1724689708331';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "chat_user_mapping" DROP CONSTRAINT "FK_8f3795d1f89512f242b69fce4e2"`,
        );
        await queryRunner.query(
            `ALTER TABLE "chat_user_mapping" ADD CONSTRAINT "FK_8f3795d1f89512f242b69fce4e2" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "chat_user_mapping" DROP CONSTRAINT "FK_8f3795d1f89512f242b69fce4e2"`,
        );
        await queryRunner.query(
            `ALTER TABLE "chat_user_mapping" ADD CONSTRAINT "FK_8f3795d1f89512f242b69fce4e2" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }
}
