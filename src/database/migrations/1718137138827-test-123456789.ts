import { MigrationInterface, QueryRunner } from 'typeorm';

export class Test1234567891718137138827 implements MigrationInterface {
  name = 'Test1234567891718137138827';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`subject\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`announce\` (\`id\` int NOT NULL AUTO_INCREMENT, \`price\` int NOT NULL, \`subjectId\` int NULL, \`levelId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`level\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`announce\` ADD CONSTRAINT \`FK_f8769121977a5dbd48d210e7542\` FOREIGN KEY (\`subjectId\`) REFERENCES \`subject\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`announce\` ADD CONSTRAINT \`FK_8216b98fde6c3e9c8a345c74c72\` FOREIGN KEY (\`levelId\`) REFERENCES \`level\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`announce\` DROP FOREIGN KEY \`FK_8216b98fde6c3e9c8a345c74c72\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`announce\` DROP FOREIGN KEY \`FK_f8769121977a5dbd48d210e7542\``,
    );
    await queryRunner.query(`DROP TABLE \`level\``);
    await queryRunner.query(`DROP TABLE \`announce\``);
    await queryRunner.query(`DROP TABLE \`subject\``);
  }
}
