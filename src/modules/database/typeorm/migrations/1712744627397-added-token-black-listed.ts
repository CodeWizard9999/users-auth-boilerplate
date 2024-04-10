import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedTokenBlackListed1712744627397 implements MigrationInterface {
  name = 'AddedTokenBlackListed1712744627397';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "token_black_list" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" character varying NOT NULL, CONSTRAINT "PK_65eae93c8ed8803c5777f5593f8" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "token_black_list"`);
  }
}
