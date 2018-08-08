import { IPerson } from '../interfaces';

export const validatePersonRequest = (req: any): req is IPerson => {
  const Fields = [
    { key: 'Firstname', type: 'string' },
    { key: 'Lastname', type: 'string' },
    { key: 'Address', type: 'string' },
    { key: 'City', type: 'string' },
    { key: 'Country', type: 'string' },
    { key: 'Lat', type: 'number' },
    { key: 'Lng', type: 'number' },
  ];
  const Num = [{ key: 'Number', type: 'string' }, { key: '_type', type: 'string' }];
  return (
    Fields.every(field => field.key in req && typeof req[field.key] === field.type) &&
    'Numbers' in req &&
    req.Numbers.every(num => Num.every(field => field.key in num && typeof num[field.key] === field.type))
  );
};
