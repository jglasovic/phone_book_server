import { IError } from '../interfaces';
import * as winston from 'winston';
import 'winston-log-and-exit';

const logger = new winston.Logger({
  transports: [new winston.transports.File({ filename: __dirname + '/../../error_logs/error.log' })],
}) as any;

export default function(err: any): void {
  if (err.name === 'error') {
    logger.log('info', err, () => {
      return console.log(err); // tslint:disable-line
    });
  } else {
    logger.log_and_exit('info', err, 1);
  }
}

export const createErrorResponse = (Error: string, message: string, data?: any): IError => ({
  Error,
  message,
  data,
});
