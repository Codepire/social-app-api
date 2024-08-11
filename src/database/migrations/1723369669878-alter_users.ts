import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterUsers1723369669878 implements MigrationInterface {
    name = 'AlterUsers1723369669878';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "users" ADD "salt" character varying(40)`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "salt"`);
    }
}
