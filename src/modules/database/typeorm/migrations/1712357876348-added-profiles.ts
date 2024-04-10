import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedProfiles1712357876348 implements MigrationInterface {
  name = 'AddedProfiles1712357876348';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "player_profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date_of_registration" TIMESTAMP NOT NULL, "level" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_ba3de28aa98207f3a21145feb88" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "admin_profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date_of_birth" TIMESTAMP NOT NULL, "contact_number" character varying NOT NULL, CONSTRAINT "PK_bc784ca31eb1821ba53980ca23d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "player_profile_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_4b2fbc80e01fb6454cfd719e489" UNIQUE ("player_profile_id")`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "admin_profile_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_a42ade9420fffb63dea32cbeba9" UNIQUE ("admin_profile_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_4b2fbc80e01fb6454cfd719e489" FOREIGN KEY ("player_profile_id") REFERENCES "player_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_a42ade9420fffb63dea32cbeba9" FOREIGN KEY ("admin_profile_id") REFERENCES "admin_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_a42ade9420fffb63dea32cbeba9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_4b2fbc80e01fb6454cfd719e489"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_a42ade9420fffb63dea32cbeba9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "admin_profile_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_4b2fbc80e01fb6454cfd719e489"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "player_profile_id"`,
    );
    await queryRunner.query(`DROP TABLE "admin_profile"`);
    await queryRunner.query(`DROP TABLE "player_profile"`);
  }
}
