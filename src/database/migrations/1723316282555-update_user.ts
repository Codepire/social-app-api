import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUser1723316282555 implements MigrationInterface {
    name = 'UpdateUser1723316282555';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "users" ADD "verified" boolean NOT NULL DEFAULT false`,
        );
        await queryRunner.query(
            `ALTER TABLE "users" ALTER COLUMN "bio" DROP NOT NULL`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "users" ALTER COLUMN "bio" SET NOT NULL`,
        );
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "verified"`);
    }
}
