import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedUser1712355798202 implements MigrationInterface {
  name = 'AddedUser1712355798202';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "password" character varying NOT NULL, "username" character varying(50) NOT NULL, "role" character varying NOT NULL, "avatar_link" character varying, "gender" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
