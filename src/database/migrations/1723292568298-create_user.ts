import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1723292568298 implements MigrationInterface {
    name = 'CreateUser1723292568298';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TYPE "public"."user_entity_gender_enum" AS ENUM('male', 'female', 'other')`,
        );
        await queryRunner.query(
            `CREATE TABLE "user_entity" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(30) NOT NULL, "email" character varying(30) NOT NULL, "password" character varying(300) NOT NULL, "bio" character varying(150) NOT NULL, "profile_url" character varying(200) NOT NULL DEFAULT 'Some url', "gender" "public"."user_entity_gender_enum" NOT NULL DEFAULT 'male', "mobile_no" character varying(10) NOT NULL, CONSTRAINT "UQ_9b998bada7cff93fcb953b0c37e" UNIQUE ("username"), CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"), CONSTRAINT "UQ_15dafe6cb93d2a0d1923d7ece9a" UNIQUE ("profile_url"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_entity"`);
        await queryRunner.query(`DROP TYPE "public"."user_entity_gender_enum"`);
    }
}
