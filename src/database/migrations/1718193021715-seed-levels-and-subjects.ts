import { MigrationInterface, QueryRunner } from 'typeorm';
import { initialLevels, initialSubjects } from '../seeds';
import { stringToSql } from '../seeds/seed-util';

export class SeedLevelsAndSubjects1718193021715 implements MigrationInterface {
  private readonly levelTable = 'level';

  private readonly subjectTable = 'subject';

  name = 'SeedLevelsAndSubjects1718193021715';

  public async up(queryRunner: QueryRunner): Promise<void> {
    this.insertLevels(queryRunner);

    this.insertSubjects(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    this.removeSubjects(queryRunner);

    this.removeLevels(queryRunner);
  }

  private insertLevels(queryRunner: QueryRunner): void {
    for (const level of initialLevels) {
      queryRunner.query(`
        INSERT INTO ${this.levelTable} (name) 
        VALUES (${stringToSql(level.name)})
      `);
    }
  }

  private insertSubjects(queryRunner: QueryRunner): void {
    for (const subject of initialSubjects) {
      queryRunner.query(`
        INSERT INTO ${this.subjectTable} (name) 
        VALUES (${stringToSql(subject.name)})
      `);
    }
  }

  private removeLevels(queryRunner: QueryRunner): void {
    queryRunner.query(`DELETE FROM ${this.levelTable}`);
  }

  private removeSubjects(queryRunner: QueryRunner): void {
    queryRunner.query(`DELETE FROM ${this.subjectTable}`);
  }
}
