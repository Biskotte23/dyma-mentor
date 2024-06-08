import { MigrationInterface, QueryRunner } from 'typeorm';
import { initialLevels, initialSubjects } from '../seeds';
import { stringToSql } from '../seeds/seed-util';

export class SeedData1717704413625 implements MigrationInterface {
  private readonly levelTable = 'level_entity';
  private readonly subjectTable = 'subject_entity';
  name = 'SeedData1717704413625';

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
      queryRunner.query(
        `INSERT INTO ${this.levelTable} (name) VALUES (${stringToSql(
          level.name,
        )})`,
      );
    }
  }

  private insertSubjects(queryRunner: QueryRunner): void {
    for (const subject of initialSubjects) {
      queryRunner.query(
        `INSERT INTO ${this.subjectTable} (name, levelId) 
        VALUES (${stringToSql(subject.name)}, ${subject.levelId})`,
      );
    }
  }

  private removeLevels(queryRunner: QueryRunner): void {
    queryRunner.query(`DELETE FROM ${this.levelTable}`);
  }

  private removeSubjects(queryRunner: QueryRunner): void {
    queryRunner.query(`DELETE FROM ${this.subjectTable}`);
  }
}
