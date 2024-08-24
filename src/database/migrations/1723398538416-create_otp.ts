import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOtp1723398538416 implements MigrationInterface {
    name = 'CreateOtp1723398538416';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TYPE "public"."otps_otp_type_enum" AS ENUM('sign up')`,
        );
        await queryRunner.query(
            `CREATE TABLE "otps" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "otp_type" "public"."otps_otp_type_enum" NOT NULL, "otp" character varying(6) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "PK_91fef5ed60605b854a2115d2410" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `ALTER TABLE "otps" ADD CONSTRAINT "FK_3938bb24b38ad395af30230bded" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "otps" DROP CONSTRAINT "FK_3938bb24b38ad395af30230bded"`,
        );
        await queryRunner.query(`DROP TABLE "otps"`);
        await queryRunner.query(`DROP TYPE "public"."otps_otp_type_enum"`);
    }
}
