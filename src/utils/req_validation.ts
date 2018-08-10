// run-time check

// define property and types
const Person = [
  { key: 'Firstname', type: 'string' },
  { key: 'Lastname', type: 'string' },
  { key: 'Address', type: 'string' },
  { key: 'City', type: 'string' },
  { key: 'Country', type: 'string' },
  { key: 'Lat', type: 'number' },
  { key: 'Lng', type: 'number' },
];

const Numbers = [{ key: 'Number', type: 'string' }, { key: '_type', type: 'string' }];

const Num = [{ key: '_person', type: 'string' }, { key: '_type', type: 'string' }, { key: 'Number', type: 'string' }];

const PhoneType = { key: 'Name', type: 'string' };

export const validatePersonCreateRequest = (req: any): boolean =>
  Person.every(field => field.key in req && typeof req[field.key] === field.type) &&
  'Numbers' in req &&
  req.Numbers.every(num => Numbers.every(field => field.key in num && typeof num[field.key] === field.type));

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
