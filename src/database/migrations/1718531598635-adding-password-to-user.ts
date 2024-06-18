import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddingPasswordToUser1718531598635 implements MigrationInterface {
  name = 'AddingPasswordToUser1718531598635';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`passwordHash\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP COLUMN \`passwordHash\``,
    );
  }
}
