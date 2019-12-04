import { classToPlain } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Country } from '../entity/Country';

export default class CountryController {
  static allowedUpdateKeys = ['name', 'currencyId'];

  static find = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.json(
        classToPlain(
          await getRepository(Country).find({
            where: { isActive: true },
          })
        )
      );
    } catch (error) {
      return res.json([]);
    }
  };

  static findById = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id) || NaN;
    const withTrashed = req.query.withTrashed === 'true';

    if (isNaN(id)) {
      return res.status(404).json({ message: res.__('RECORD_NOT_FOUND') });
    }

    try {
      return res.json(
        classToPlain(
          await getRepository(Country).findOneOrFail(id, {
            where: withTrashed ? {} : { isActive: true },
          })
        )
      );
    } catch (error) {
      return res.status(404).json({ message: res.__('RECORD_NOT_FOUND') });
    }
  };

  static create = async (req: Request, res: Response, next: NextFunction) => {
    let { name, currencyId } = req.body;

    let country: Country = new Country();
    country.name = name;
    country.currency = currencyId;

    const errors = await validate(country);

    if (errors.length > 0) {
      res.status(400).json({ message: res.__('COUNTRY_INVALID') });
      return;
    }

    try {
      await getRepository(Country).save(country);
    } catch (error) {
      res.status(500).json({ message: res.__('INTERNAL_ERROR') });
      return;
    }

    res.status(201).json(classToPlain(country));
  };

  static update = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id) || NaN;

    if (isNaN(id)) {
      return res.status(404).json({ message: res.__('RECORD_NOT_FOUND') });
    }

    const countryRepository = getRepository(Country);

    // Get country from the database
    let country: Country;
    try {
      country = await countryRepository.findOneOrFail(id);
    } catch (error) {
      return res.status(404).json({ message: res.__('RECORD_NOT_FOUND') });
    }

    let somethingChange = false;
    const body = { ...req.body };

    await Promise.all(
      Object.keys(body).map(async key => {
        if (
          CountryController.allowedUpdateKeys.indexOf(key) !== -1 &&
          country[key] !== body[key]
        ) {
          country[key] = body[key];
          somethingChange = true;
        }
      })
    );

    if (somethingChange) {
      try {
        await countryRepository.save(country);
      } catch (error) {
        return res.status(500).json({ message: res.__('INTERNAL_ERROR') });
      }

      country = await countryRepository.findOneOrFail(id);
    }

    res.json(classToPlain(country));
  };

  static remove = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id) || NaN;

    if (isNaN(id)) {
      return res.status(404).json({ message: res.__('RECORD_NOT_FOUND') });
    }

    const countryRepository = getRepository(Country);

    let country: Country;
    try {
      country = await countryRepository.findOneOrFail(id, {
        where: { isActive: true },
      });
    } catch (error) {
      return res.status(404).json({ message: res.__('RECORD_NOT_FOUND') });
    }

    try {
      country.isActive = false;
      await countryRepository.save(country);
    } catch (error) {
      return res.status(500).json({ message: res.__('INTERNAL_ERROR') });
    }

    return res.json({
      message: res.__('RECORD_REMOVED'),
    });
  };
}
