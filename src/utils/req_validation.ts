// run-time check

// define property and types
const Person = [
  { key: 'firstname', type: 'string' },
  { key: 'lastname', type: 'string' },
  { key: 'address', type: 'string' },
  { key: 'city', type: 'string' },
  { key: 'country', type: 'string' },
  { key: 'lat', type: 'number' },
  { key: 'lng', type: 'number' },
];

const Numbers = [{ key: 'number', type: 'string' }, { key: 'type', type: 'string' }];

const Num = [{ key: 'person', type: 'string' }, { key: 'type', type: 'string' }, { key: 'number', type: 'string' }];

const PhoneType = { key: 'name', type: 'string' };

export const validatePersonCreateRequest = (req: any): boolean =>
  Person.every(field => field.key in req && typeof req[field.key] === field.type) &&
  'numbers' in req &&
  req.numbers.every(num => Numbers.every(field => field.key in num && typeof num[field.key] === field.type));

export const validatePersonUpdateRequest = (req: any): boolean => {
  const Fields = Person.filter(field => field.key in req);
  return Fields.every(field => typeof req[field.key] === field.type);
};

export const validateNumberCreateRequest = (req: any): boolean =>
  Num.every(field => field.key in req && typeof req[field.key] === field.type);

export const validateNumberUpdateRequest = (req: any): boolean => {
  const Fields = Num.filter(num => num.key in req);
  return Fields.every(field => typeof req[field.key] === field.type);
};

export const validatePhoneTypeCreateUpdateRequest = (req: any): boolean =>
  PhoneType.key in req && typeof req[PhoneType.key] === PhoneType.type;
