import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixCascade1724686587849 implements MigrationInterface {
    name = 'FixCascade1724686587849';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "otps" DROP CONSTRAINT "FK_3938bb24b38ad395af30230bded"`,
        );
        await queryRunner.query(
            `ALTER TABLE "otps" ADD CONSTRAINT "FK_3938bb24b38ad395af30230bded" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "otps" DROP CONSTRAINT "FK_3938bb24b38ad395af30230bded"`,
        );
        await queryRunner.query(
            `ALTER TABLE "otps" ADD CONSTRAINT "FK_3938bb24b38ad395af30230bded" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }
}
