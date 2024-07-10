import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddingRoleToUser1718778225349 implements MigrationInterface {
  name = 'AddingRoleToUser1718778225349';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`role\` ENUM ('student', 'teacher', 'admin') NOT NULL DEFAULT 'admin'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
  }
}
