import { Request, Response, NextFunction } from 'express';
import * as mcache from 'memory-cache';

export const withCache = (
  req: Request,
  res: Response & any,
  next: NextFunction
) => {
  const key = `__express__${req.originalUrl || req.url}`;
  let cachedBody = mcache.get(key);

  try {
    if (!!cachedBody) {
      cachedBody = JSON.parse(cachedBody);
    }
  } catch (err) {
    cachedBody = undefined;
  }

  if (!!cachedBody) {
    res.status(cachedBody.status || 200).json(cachedBody);
    return;
  }

  res.jsonResponse = res.json;
  res.json = (json: any) => {
    mcache.put(key, JSON.stringify(json), 10 * 60 * 1000);
    res.jsonResponse(json);
  };

  next();
};
