import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { Country } from '../entity/Country';
import { Currency } from '../entity/Currency';

export class SeedCountry1575494363567 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const currencyRepository = getRepository(Currency);

    const dolar = await currencyRepository.findOneOrFail(1);
    const euro = await currencyRepository.findOneOrFail(2);

    await getRepository(Country).save([
      {
        name: 'United States',
        currency: dolar,
      },
      {
        name: 'England',
        currency: euro,
      },
      {
        name: 'Spain',
        currency: euro,
      },
      {
        name: 'Portugal',
        currency: euro,
      },
      {
        name: 'Ireland',
        currency: euro,
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await getRepository(Country).delete({ isActive: true });
  }
}
