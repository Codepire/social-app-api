import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUser1723317905392 implements MigrationInterface {
    name = 'UpdateUser1723317905392';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "users" ALTER COLUMN "profile_url" DROP NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE "users" ALTER COLUMN "profile_url" DROP DEFAULT`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "users" ALTER COLUMN "profile_url" SET DEFAULT 'Some url'`,
        );
        await queryRunner.query(
            `ALTER TABLE "users" ALTER COLUMN "profile_url" SET NOT NULL`,
        );
    }
}
