import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { Currency } from '../entity/Currency';

export class SeedCurrency1575494351917 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await getRepository(Currency).save([
      {
        currencyName: 'American Dolar',
        currencySymbol: 'USD',
        currencyDolarValue: 1,
      },
      {
        currencyName: 'Euro',
        currencySymbol: '€',
        currencyDolarValue: 1.11,
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await getRepository(Currency).delete({ isActive: true });
  }
}
