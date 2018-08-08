import { IPersonCreateRequest, IDeletedMongoose, IPersonUpdateRequest } from '../interfaces';
import PersonModel from '../models/person';
import NumberModel from '../models/number';

class PersonService {
  public getAll = async () =>
    PersonModel.ModelType.find({}, PersonModel.filter) // find all persons with numbers and number types
      .populate({
        path: 'Numbers',
        populate: {
          path: '_type',
          model: 'Phone_type',
          select: '-__v',
        },
        select: '-__v',
      })
      .populate('Default')
      .exec();

  public getOne = (_id: string) =>
    PersonModel.ModelType.findOne({ _id }, PersonModel.filter) // find one person by _id with numbers and number types
      .populate({
        path: 'Numbers',
        populate: {
          path: '_type',
          model: 'Phone_type',
          select: '-__v',
        },
        select: '-__v',
      })
      .exec();

  public create = (data: IPersonCreateRequest) =>
    new Promise(async (res, rej) => {
      try {
        const Numbers = await NumberModel.ModelType.create(data.Numbers); // create all numbers and get _ids
        data.Default = Numbers[0]._id; // set first as default
        data.Numbers.forEach((num, i) => (num.Default ? (data.Default = Numbers[i]._id) : null)); // check if user set default ad rewrite first
        data.Numbers = Numbers.map(num => num._id); // map all number _ids for Person schema
        const Person = await PersonModel.ModelType.create(data); // create Person
        res(Person);
      } catch (err) {
        rej(err);
      }
    });

  public update = (data: IPersonUpdateRequest) => PersonModel.ModelType.update({ _id: data._id }, data).exec(); // update person

  public delete = (_id: string) =>
    new Promise(async (res, rej) => {
      try {
        const deletedNumbers: IDeletedMongoose = await NumberModel.ModelType.deleteMany({ _person: _id }).exec(); // delete all person numbers
        if (deletedNumbers.n === 0 || deletedNumbers.ok === 0) {
          rej({ message: 'Database error!' });
        }
        const deletedPerson: IDeletedMongoose = await PersonModel.ModelType.deleteOne({ _id }).exec(); // delete person
        if (deletedPerson.n !== 1 || deletedPerson.ok !== 1) {
          rej({ message: 'Database error!' });
        }
        res({ message: 'Deleted!', Id: _id });
      } catch (err) {
        rej(err);
      }
    });
}

export default PersonService;
