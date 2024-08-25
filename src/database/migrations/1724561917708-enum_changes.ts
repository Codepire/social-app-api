import { MigrationInterface, QueryRunner } from 'typeorm';

export class EnumChanges1724561917708 implements MigrationInterface {
    name = 'EnumChanges1724561917708';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TYPE "public"."otps_otp_type_enum" RENAME TO "otps_otp_type_enum_old"`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."otps_otp_type_enum" AS ENUM('sign up', 'forgot password')`,
        );
        await queryRunner.query(
            `ALTER TABLE "otps" ALTER COLUMN "otp_type" TYPE "public"."otps_otp_type_enum" USING "otp_type"::"text"::"public"."otps_otp_type_enum"`,
        );
        await queryRunner.query(`DROP TYPE "public"."otps_otp_type_enum_old"`);
        await queryRunner.query(
            `ALTER TYPE "public"."user_entity_gender_enum" RENAME TO "user_entity_gender_enum_old"`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."users_gender_enum" AS ENUM('male', 'female', 'other')`,
        );
        await queryRunner.query(
            `ALTER TABLE "users" ALTER COLUMN "gender" DROP DEFAULT`,
        );
        await queryRunner.query(
            `ALTER TABLE "users" ALTER COLUMN "gender" TYPE "public"."users_gender_enum" USING "gender"::"text"::"public"."users_gender_enum"`,
        );
        await queryRunner.query(
            `ALTER TABLE "users" ALTER COLUMN "gender" SET DEFAULT 'male'`,
        );
        await queryRunner.query(
            `DROP TYPE "public"."user_entity_gender_enum_old"`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TYPE "public"."user_entity_gender_enum_old" AS ENUM('male', 'female', 'other')`,
        );
        await queryRunner.query(
            `ALTER TABLE "users" ALTER COLUMN "gender" DROP DEFAULT`,
        );
        await queryRunner.query(
            `ALTER TABLE "users" ALTER COLUMN "gender" TYPE "public"."user_entity_gender_enum_old" USING "gender"::"text"::"public"."user_entity_gender_enum_old"`,
        );
        await queryRunner.query(
            `ALTER TABLE "users" ALTER COLUMN "gender" SET DEFAULT 'male'`,
        );
        await queryRunner.query(`DROP TYPE "public"."users_gender_enum"`);
        await queryRunner.query(
            `ALTER TYPE "public"."user_entity_gender_enum_old" RENAME TO "user_entity_gender_enum"`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."otps_otp_type_enum_old" AS ENUM('sign up')`,
        );
        await queryRunner.query(
            `ALTER TABLE "otps" ALTER COLUMN "otp_type" TYPE "public"."otps_otp_type_enum_old" USING "otp_type"::"text"::"public"."otps_otp_type_enum_old"`,
        );
        await queryRunner.query(`DROP TYPE "public"."otps_otp_type_enum"`);
        await queryRunner.query(
            `ALTER TYPE "public"."otps_otp_type_enum_old" RENAME TO "otps_otp_type_enum"`,
        );
    }
}
