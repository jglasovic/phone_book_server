import * as cf from 'config';
import { sign, verify } from 'jsonwebtoken';
import { IConfig } from './interfaces';

class TokenGenerator {
  public static readonly generate = (data: any): Promise<string | object> =>
    new Promise((res, rej) => {
      sign(
        {
          data,
        },
        TokenGenerator.config.secretKey,
        TokenGenerator.config.options,
        (err, value: string) => {
          if (err) {
            rej(err);
          }
          res({ Token: value, ...TokenGenerator.config.options });
        }
      );
    });

  public static readonly decode = (data: string): string | object => verify(data, TokenGenerator.config.secretKey);

  private static config: IConfig = cf.util.toObject();
}

export default TokenGenerator;
