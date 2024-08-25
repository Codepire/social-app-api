import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableChatUserMapping1724580162349
    implements MigrationInterface
{
    name = 'CreateTableChatUserMapping1724580162349';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "chats_users_users" ("chat_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_ef63b86f0158f4e7b98bed99344" PRIMARY KEY ("chat_id", "user_id"))`,
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_11943aa6ea6da3f2b12650f5c1" ON "chats_users_users" ("chat_id") `,
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_c82ec77bdaba3082ac28564544" ON "chats_users_users" ("user_id") `,
        );
        await queryRunner.query(
            `ALTER TABLE "chats_users_users" ADD CONSTRAINT "FK_11943aa6ea6da3f2b12650f5c16" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE "chats_users_users" ADD CONSTRAINT "FK_c82ec77bdaba3082ac285645449" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "chats_users_users" DROP CONSTRAINT "FK_c82ec77bdaba3082ac285645449"`,
        );
        await queryRunner.query(
            `ALTER TABLE "chats_users_users" DROP CONSTRAINT "FK_11943aa6ea6da3f2b12650f5c16"`,
        );
        await queryRunner.query(
            `DROP INDEX "public"."IDX_c82ec77bdaba3082ac28564544"`,
        );
        await queryRunner.query(
            `DROP INDEX "public"."IDX_11943aa6ea6da3f2b12650f5c1"`,
        );
        await queryRunner.query(`DROP TABLE "chats_users_users"`);
    }
}
