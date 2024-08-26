import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateChatUserMapping1724687960996 implements MigrationInterface {
    name = 'UpdateChatUserMapping1724687960996';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TYPE "public"."chat_user_mapping_role_enum" AS ENUM('admin', 'member')`,
        );
        await queryRunner.query(
            `CREATE TABLE "chat_user_mapping" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "role" "public"."chat_user_mapping_role_enum" NOT NULL DEFAULT 'member', "user_id" uuid, "chat_id" uuid, CONSTRAINT "PK_de4624be338b86ce153298806de" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `ALTER TABLE "chat_user_mapping" ADD CONSTRAINT "FK_3f02f1481b11b3d887f1fa9543a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "chat_user_mapping" ADD CONSTRAINT "FK_8f3795d1f89512f242b69fce4e2" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "chat_user_mapping" DROP CONSTRAINT "FK_8f3795d1f89512f242b69fce4e2"`,
        );
        await queryRunner.query(
            `ALTER TABLE "chat_user_mapping" DROP CONSTRAINT "FK_3f02f1481b11b3d887f1fa9543a"`,
        );
        await queryRunner.query(`DROP TABLE "chat_user_mapping"`);
        await queryRunner.query(
            `DROP TYPE "public"."chat_user_mapping_role_enum"`,
        );
    }
}
