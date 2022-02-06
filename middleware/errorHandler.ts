import { NextApiResponse } from 'next';
import { log } from 'helpers/api';

export const errorHandler = (error: any, res: NextApiResponse) => {
  if (typeof error === 'string') {
    const is404 = error.toLocaleLowerCase().endsWith('not found');
    const statusCode = is404 ? 404 : 400;

    return res.status(statusCode).json({ message: error });
  }

  if (error.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Invalid Token' });
  }

  log.info(error);
  return res.status(500).json({ message: error.message });
};
