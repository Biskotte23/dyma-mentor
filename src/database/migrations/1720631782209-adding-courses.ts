import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddingCourses1720631782209 implements MigrationInterface {
  name = 'AddingCourses1720631782209';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`course\` (\`id\` int NOT NULL AUTO_INCREMENT, \`date\` datetime NOT NULL, \`hours\` int NOT NULL, \`studentId\` int NULL, \`announceId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`announce\` ADD \`teacherId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`announce\` ADD CONSTRAINT \`FK_6243a4487a80d1c7121e739abe5\` FOREIGN KEY (\`teacherId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`course\` ADD CONSTRAINT \`FK_109c4b0a2141056214af27a38dc\` FOREIGN KEY (\`studentId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`course\` ADD CONSTRAINT \`FK_89e385d048f49df7479e7b2dbfe\` FOREIGN KEY (\`announceId\`) REFERENCES \`announce\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`course\` DROP FOREIGN KEY \`FK_89e385d048f49df7479e7b2dbfe\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`course\` DROP FOREIGN KEY \`FK_109c4b0a2141056214af27a38dc\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`announce\` DROP FOREIGN KEY \`FK_6243a4487a80d1c7121e739abe5\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`announce\` DROP COLUMN \`teacherId\``,
    );
    await queryRunner.query(`DROP TABLE \`course\``);
  }
}
