import { classToPlain } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Currency } from '../entity/Currency';

export default class CurrencyController {
  static allowedUpdateKeys = [
    'currencyName',
    'currencySymbol',
    'currencyDolarValue',
  ];

  static find = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.json(
        classToPlain(
          await getRepository(Currency).find({
            where: { isActive: true },
          })
        )
      );
    } catch (error) {
      return res.json([]);
    }
  };

  static getValueOf = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const from = parseInt(req.query.from) || NaN;
    const value = parseFloat(req.query.value) || NaN;
    const to = parseInt(req.query.to) || NaN;

    if (isNaN(from) || isNaN(value) || isNaN(to)) {
      return res.status(404).json({ message: res.__('RECORD_NOT_FOUND') });
    }

    try {
      const currencies = await getRepository(Currency)
        .createQueryBuilder('currency')
        .where('currency.isActive = true')
        .whereInIds([from, to])
        .orderBy('currency.id', from > to ? 'DESC' : 'ASC')
        .getMany();

      if (currencies.length !== 2) {
        throw new Error();
      }

      return res.json({
        value:
          parseFloat(value.toFixed(4)) *
          (currencies[0].currencyDolarValue / currencies[1].currencyDolarValue),
      });
    } catch (error) {
      return res.status(404).json({ message: res.__('RECORD_NOT_FOUND') });
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
          await getRepository(Currency).findOneOrFail(id, {
            where: withTrashed ? {} : { isActive: true },
          })
        )
      );
    } catch (error) {
      return res.status(404).json({ message: res.__('RECORD_NOT_FOUND') });
    }
  };

  static create = async (req: Request, res: Response, next: NextFunction) => {
    let { currencyName, currencySymbol, currencyDolarValue } = req.body;

    let currency: Currency = new Currency();
    currency.currencyName = currencyName;
    currency.currencySymbol = currencySymbol;
    currency.currencyDolarValue = currencyDolarValue;

    const errors = await validate(currency);

    if (errors.length > 0) {
      res.status(400).json({ message: res.__('CURRENCY_INVALID') });
      return;
    }

    try {
      await getRepository(Currency).save(currency);
    } catch (error) {
      res.status(500).json({ message: res.__('INTERNAL_ERROR') });
      return;
    }

    res.status(201).json(classToPlain(currency));
  };

  static update = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id) || NaN;

    if (isNaN(id)) {
      return res.status(404).json({ message: res.__('RECORD_NOT_FOUND') });
    }

    const currencyRepository = getRepository(Currency);

    // Get currency from the database
    let currency: Currency;
    try {
      currency = await currencyRepository.findOneOrFail(id);
    } catch (error) {
      return res.status(404).json({ message: res.__('RECORD_NOT_FOUND') });
    }

    let somethingChange = false;
    const body = { ...req.body };

    await Promise.all(
      Object.keys(body).map(async key => {
        if (
          CurrencyController.allowedUpdateKeys.indexOf(key) !== -1 &&
          currency[key] !== body[key]
        ) {
          currency[key] = body[key];
          somethingChange = true;
        }
      })
    );

    if (somethingChange) {
      try {
        await currencyRepository.save(currency);
      } catch (error) {
        return res.status(500).json({ message: res.__('INTERNAL_ERROR') });
      }

      currency = await currencyRepository.findOneOrFail(id);
    }

    res.json(classToPlain(currency));
  };

  static remove = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id) || NaN;

    if (isNaN(id)) {
      return res.status(404).json({ message: res.__('RECORD_NOT_FOUND') });
    }

    const currencyRepository = getRepository(Currency);

    let currency: Currency;
    try {
      currency = await currencyRepository.findOneOrFail(id, {
        where: { isActive: true },
      });
    } catch (error) {
      return res.status(404).json({ message: res.__('RECORD_NOT_FOUND') });
    }

    try {
      currency.isActive = false;
      await currencyRepository.save(currency);
    } catch (error) {
      return res.status(500).json({ message: res.__('INTERNAL_ERROR') });
    }

    return res.json({
      message: res.__('RECORD_REMOVED'),
    });
  };
}
