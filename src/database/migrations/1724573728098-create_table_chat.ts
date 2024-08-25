import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableChat1724573728098 implements MigrationInterface {
    name = 'CreateTableChat1724573728098';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TYPE "public"."chats_type_enum" AS ENUM('direct message', 'group')`,
        );
        await queryRunner.query(
            `CREATE TABLE "chats" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "profile_url" character varying, "bio" character varying, "type" "public"."chats_type_enum" NOT NULL DEFAULT 'direct message', "created_by" uuid, CONSTRAINT "PK_0117647b3c4a4e5ff198aeb6206" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `ALTER TABLE "chats" ADD CONSTRAINT "FK_d3d5c049f59f0f7266900e6adc1" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "chats" DROP CONSTRAINT "FK_d3d5c049f59f0f7266900e6adc1"`,
        );
        await queryRunner.query(`DROP TABLE "chats"`);
        await queryRunner.query(`DROP TYPE "public"."chats_type_enum"`);
    }
}
